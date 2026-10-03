import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";

let base: CanvasTexture | null = null;

function rng(seed: number) {
  return () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
}

function getBase() {
  if (base) return base;
  const S = 256;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  const rnd = rng(7);

  g.fillStyle = "#5a5a5a";
  g.fillRect(0, 0, S, S);
  const rows = 4;
  const bh = S / rows;
  for (let r = 0; r < rows; r++) {
    const off = r % 2 ? S / 4 : 0;
    for (let b = -1; b < 3; b++) {
      const v = 170 + rnd() * 60;
      g.fillStyle = `rgb(${v},${v},${v})`;
      g.fillRect(b * 128 + off + 2, r * bh + 2, 124, bh - 4);
    }
  }
  for (let i = 0; i < 1800; i++) {
    g.fillStyle = rnd() > 0.5 ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)";
    g.fillRect(rnd() * S, rnd() * S, 2, 2);
  }

  const t = new CanvasTexture(c);
  t.wrapS = t.wrapT = RepeatWrapping;
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  base = t;
  return t;
}

export function stoneTexture(rx: number, ry: number) {
  const t = getBase().clone();
  t.repeat.set(rx, ry);
  t.needsUpdate = true;
  return t;
}
