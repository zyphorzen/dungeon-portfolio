import type { ReactNode } from "react";
import { ROOMS } from "../dungeon/config";
import type { RoomId } from "../dungeon/config";
import About from "../portfolio/sections/About";
import Skills from "../portfolio/sections/Skills";
import Projects from "../portfolio/sections/Projects";
import Experience from "../portfolio/sections/Experience";
import Contact from "../portfolio/sections/Contact";

const SECTIONS: Record<RoomId, ReactNode> = {
  about: <About />,
  skills: <Skills />,
  projects: <Projects />,
  experience: <Experience />,
  contact: <Contact />,
};

export default function FallbackPortfolio() {
  return (
    <main className="h-[100dvh] overflow-y-auto bg-stone-950 text-stone-100">
      <div className="mx-auto max-w-2xl space-y-10 p-6">
        {ROOMS.map((r) => (
          <section key={r.id}>
            <h2
              className="mb-3 text-xl font-bold tracking-wide"
              style={{ color: r.accent }}
            >
              {r.label}
            </h2>
            {SECTIONS[r.id]}
          </section>
        ))}
        <a
          href="./"
          className="inline-block text-sm text-amber-300 hover:underline"
        >
          Coba versi 3D
        </a>
      </div>
    </main>
  );
}
