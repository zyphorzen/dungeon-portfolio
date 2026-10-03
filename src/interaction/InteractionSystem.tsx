import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { playerPos } from "../player/state";
import { getInteractables, setCurrent, triggerCurrent } from "./store";
import { isInputBlocked } from "../ui/gameStore";
import { playInteract } from "../audio/audio";

export default function InteractionSystem() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "KeyE" && !e.repeat && !isInputBlocked()) {
        triggerCurrent();
        playInteract();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useFrame(() => {
    let best: string | null = null;
    let bestD = Infinity;
    for (const it of getInteractables()) {
      const d = Math.hypot(playerPos.x - it.x, playerPos.z - it.z);
      if (d <= it.radius && d < bestD) {
        bestD = d;
        best = it.id;
      }
    }
    setCurrent(best);
  });

  return null;
}
