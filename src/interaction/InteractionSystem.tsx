import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { playerPos } from "../player/state";
import { getInteractables, setCurrent } from "./store";
import { tryInteract } from "./interact";

export default function InteractionSystem() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "KeyE" && !e.repeat) tryInteract();
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
