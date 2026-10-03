import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { useKeyboard } from "./useKeyboard";
import { look, playerPos } from "./state";
import { resolveCollision } from "./collision";
import { isPortfolioOpen } from "../portfolio/store";

const WALK = 4;
const SPRINT = 8;
const RADIUS = 0.4;

export default function Player() {
  const ref = useRef<Group>(null);
  const keys = useKeyboard();

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g || isPortfolioOpen()) return;
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

      const speed = k.has("ShiftLeft") || k.has("ShiftRight") ? SPRINT : WALK;
      const [nx, nz] = resolveCollision(
        g.position.x + mx * speed * dt,
        g.position.z + mz * speed * dt,
        RADIUS,
      );
      g.position.x = nx;
      g.position.z = nz;

      let diff = Math.atan2(mx, mz) - g.rotation.y;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      g.rotation.y += diff * Math.min(1, dt * 12);
    }

    playerPos.copy(g.position);
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0.75, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.8, 4, 12]} />
        <meshStandardMaterial color="#6b7a99" roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.1, 0.35]} castShadow>
        <boxGeometry args={[0.25, 0.15, 0.2]} />
        <meshStandardMaterial color="#d9a441" />
      </mesh>
    </group>
  );
}
