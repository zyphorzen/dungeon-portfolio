import { useEffect, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { ROOMS } from "../dungeon/config";
import type { RoomId } from "../dungeon/config";
import { closePortfolio, getActiveRoom, subscribe } from "./store";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

const SECTIONS: Record<RoomId, ReactNode> = {
  about: <About />,
  skills: <Skills />,
  projects: <Projects />,
  experience: <Experience />,
  contact: <Contact />,
};

export default function PortfolioPanel() {
  const id = useSyncExternalStore(subscribe, getActiveRoom);

  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") closePortfolio();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [id]);

  if (!id) return null;
  const room = ROOMS.find((r) => r.id === id)!;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={closePortfolio}
    >
      <div
        className="max-h-[85vh] w-full max-w-xl overflow-y-auto rounded-lg border bg-stone-950/95 p-6 text-stone-100 shadow-2xl"
        style={{ borderColor: room.accent }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            className="text-xl font-bold tracking-wide"
            style={{ color: room.accent }}
          >
            {room.label}
          </h2>
          <button
            onClick={closePortfolio}
            className="rounded border border-white/20 px-2 py-0.5 text-xs text-stone-300 hover:bg-white/10"
          >
            ESC • Tutup
          </button>
        </div>
        {SECTIONS[id]}
      </div>
    </div>
  );
}
