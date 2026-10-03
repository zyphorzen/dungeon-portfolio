import { useEffect } from "react";
import Modal from "./Modal";
import {
  getState,
  lockPointer,
  resetQuest,
  setPaused,
  useGame,
} from "./gameStore";
import { closePortfolio, isPortfolioOpen } from "../portfolio/store";

const CONTROLS: [string, string][] = [
  ["W A S D", "Gerak"],
  ["Shift", "Lari"],
  ["Mouse", "Kamera"],
  ["E", "Interaksi"],
  ["ESC", "Menu"],
];

function resume() {
  setPaused(false);
  lockPointer();
}

export default function PauseMenu() {
  const paused = useGame((s) => s.paused);

  useEffect(() => {
    let lastUnlock = 0;

    const onLockChange = () => {
      if (document.pointerLockElement) return;
      lastUnlock = performance.now();
      const s = getState();
      if (s.started && !s.paused && !isPortfolioOpen()) setPaused(true);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Escape" || e.repeat) return;
      if (document.pointerLockElement) return;
      if (performance.now() - lastUnlock < 150) return;
      if (isPortfolioOpen()) {
        closePortfolio();
        return;
      }
      const s = getState();
      if (!s.started) return;
      setPaused(!s.paused);
      if (s.paused) lockPointer();
    };

    document.addEventListener("pointerlockchange", onLockChange);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerlockchange", onLockChange);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <Modal open={paused} title="Jeda">
      <dl className="mb-5 grid grid-cols-2 gap-y-1 text-sm">
        {CONTROLS.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-mono text-amber-300">{k}</dt>
            <dd className="text-stone-300">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex gap-3">
        <button
          onClick={resume}
          className="rounded border border-amber-400/60 px-4 py-1.5 text-sm text-amber-200 hover:bg-amber-300/10"
        >
          Lanjutkan
        </button>
        <button
          onClick={resetQuest}
          className="rounded border border-white/20 px-4 py-1.5 text-sm text-stone-300 hover:bg-white/10"
        >
          Reset Quest
        </button>
      </div>
    </Modal>
  );
}
