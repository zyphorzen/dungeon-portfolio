let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
let muted = false;

export function toggleMute() {
  muted = !muted;
  if (master) master.gain.value = muted ? 0 : 0.5;
}

export function startAudio() {
  if (ctx) {
    void ctx.resume();
    return;
  }
  ctx = new AudioContext();
  master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);

  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = noise.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 220;
  for (const f of [55, 55.5, 82.4]) {
    const o = ctx.createOscillator();
    o.type = "sawtooth";
    o.frequency.value = f;
    o.connect(lp);
    o.start();
  }
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.1;
  lp.connect(droneGain);
  droneGain.connect(master);

  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 90;
  lfo.connect(lfoGain);
  lfoGain.connect(lp.frequency);
  lfo.start();

  const wind = ctx.createBufferSource();
  wind.buffer = noise;
  wind.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 400;
  bp.Q.value = 0.6;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.025;
  wind.connect(bp);
  bp.connect(windGain);
  windGain.connect(master);
  wind.start();

  window.addEventListener("keydown", (e) => {
    if (e.code === "KeyM" && !e.repeat) toggleMute();
  });
}

export function playStep(sprint: boolean) {
  if (!ctx || !master || !noise) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const f = ctx.createBiquadFilter();
  f.type = "lowpass";
  f.frequency.value = 500 + Math.random() * 300;
  const g = ctx.createGain();
  g.gain.setValueAtTime(sprint ? 0.35 : 0.22, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t, Math.random() * 0.5, 0.15);
}

export function playInteract() {
  if (!ctx || !master) return;
  const t = ctx.currentTime;
  [440, 660].forEach((freq, i) => {
    const o = ctx!.createOscillator();
    o.type = "triangle";
    o.frequency.value = freq;
    const g = ctx!.createGain();
    g.gain.setValueAtTime(0.0001, t + i * 0.08);
    g.gain.exponentialRampToValueAtTime(0.25, t + i * 0.08 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 0.35);
    o.connect(g);
    g.connect(master!);
    o.start(t + i * 0.08);
    o.stop(t + i * 0.08 + 0.4);
  });
}

export function playDoor(opening: boolean) {
  if (!ctx || !master || !noise) return;
  const t = ctx.currentTime;
  const dur = opening ? 0.9 : 0.6;

  const src = ctx.createBufferSource();
  src.buffer = noise;
  src.loop = true;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 2;
  f.frequency.setValueAtTime(opening ? 180 : 320, t);
  f.frequency.linearRampToValueAtTime(opening ? 320 : 120, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.28, t + 0.1);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f);
  f.connect(g);
  g.connect(master);
  src.start(t);
  src.stop(t + dur + 0.05);

  const o = ctx.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(opening ? 70 : 55, t);
  o.frequency.exponentialRampToValueAtTime(35, t + dur);
  const og = ctx.createGain();
  og.gain.setValueAtTime(0.0001, t);
  og.gain.exponentialRampToValueAtTime(0.3, t + 0.05);
  og.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(og);
  og.connect(master);
  o.start(t);
  o.stop(t + dur + 0.05);
}
