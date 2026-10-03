import { useProgress } from "@react-three/drei";
import { startGame, useGame } from "./gameStore";

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const sceneReady = useGame((s) => s.sceneReady);
  const started = useGame((s) => s.started);
  if (started) return null;

  const ready = sceneReady && !active;
  const pct = ready ? 100 : Math.round(progress);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#0a0a0f] text-amber-100">
      <h1 className="text-3xl font-bold tracking-[0.3em] text-amber-300">
        DUNGEON PORTFOLIO
      </h1>
      <div className="h-1.5 w-64 overflow-hidden rounded bg-white/10">
        <div
          className="h-full bg-amber-400 transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <button
        disabled={!ready}
        onClick={startGame}
        className="rounded border border-amber-400/60 px-6 py-2 tracking-widest text-amber-200 enabled:hover:bg-amber-300/10 disabled:opacity-40"
      >
        {ready ? "MASUK DUNGEON" : `MEMUAT ${pct}%`}
      </button>
    </div>
  );
}
