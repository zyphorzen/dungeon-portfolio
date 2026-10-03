import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { ROOMS } from "../dungeon/config";
import type { RoomId } from "../dungeon/config";
import Modal from "../ui/Modal";
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
  const room = ROOMS.find((r) => r.id === id);

  return (
    <Modal
      open={!!room}
      title={room?.label ?? ""}
      accent={room?.accent}
      onClose={closePortfolio}
    >
      {id && SECTIONS[id]}
    </Modal>
  );
}
