import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useKeyboard } from "./useKeyboard";
import { look, motion, playerPos } from "./state";
import { resolveCollision } from "./collision";
import { isInputBlocked } from "../ui/gameStore";
import { playStep } from "../audio/audio";
import Character from "./Character";

const WALK = 4;
const SPRINT = 8;
const RADIUS = 0.4;

export default function Player() {
  const ref = useRef<Group>(null);
  const stepT = useRef(0);
  const keys = useKeyboard();

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    if (isInputBlocked()) {
      motion.speed = 0;
      return;
    }
    const dt = Math.min(delta, 0.05);
    const k = keys.current;

    const f = (k.has("KeyW") ? 1 : 0) - (k.has("KeyS") ? 1 : 0);
    const r = (k.has("KeyD") ? 1 : 0) - (k.has("KeyA") ? 1 : 0);

    if (f !== 0 || r !== 0) {
      const sin = Math.sin(look.yaw);
      const cos = Math.cos(look.yaw);
      let mx = -sin * f + cos * r;
      let mz = -cos * f - sin * r;
      const len = Math.hypot(mx, mz);
      mx /= len;
      mz /= len;

      const sprint = k.has("ShiftLeft") || k.has("ShiftRight");
      const speed = sprint ? SPRINT : WALK;
      const [nx, nz] = resolveCollision(
        g.position.x + mx * speed * dt,
        g.position.z + mz * speed * dt,
        RADIUS,
      );
      g.position.x = nx;
      g.position.z = nz;
      motion.speed = speed;

      stepT.current += dt;
      if (stepT.current > (sprint ? 0.3 : 0.48)) {
        stepT.current = 0;
        playStep(sprint);
      }

      let diff = Math.atan2(-mx, -mz) - g.rotation.y;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      g.rotation.y += diff * Math.min(1, dt * 12);
    } else {
      motion.speed = 0;
      stepT.current = 0.3;
    }

    playerPos.copy(g.position);
  });

  return (
    <group ref={ref}>
      <Suspense fallback={null}>
        <Character />
      </Suspense>
    </group>
  );
}
