import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Mesh, PointLight } from "three";
import type { TorchDef } from "./config";
import { TORCHES } from "./layout";
import { playerPos } from "../player/state";
import { isLowEnd } from "../utils/device";

const BASE = 35;
const POOL = isLowEnd ? 3 : 5;

const LIGHT_POS = TORCHES.map((t) => ({
  x: t.pos[0] + Math.sin(t.rotY) * 0.4,
  y: t.pos[1] + 0.75,
  z: t.pos[2] + Math.cos(t.rotY) * 0.4,
}));

function Flame({ pos, rotY }: TorchDef) {
  const flame = useRef<Mesh>(null);
  const seed = pos[0] * 1.7 + pos[2] * 2.3;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + seed;
    flame.current?.scale.set(
      1,
      1 + Math.sin(t * 9) * 0.1 + Math.sin(t * 23.7) * 0.08,
      1,
    );
  });

  return (
    <group position={pos} rotation={[0, rotY, 0]}>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[0.18, 0.18, 0.2]} />
        <meshStandardMaterial color="#222" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.2, 0.25]}>
        <cylinderGeometry args={[0.05, 0.06, 0.6, 8]} />
        <meshStandardMaterial color="#4a3320" roughness={1} />
      </mesh>
      <mesh ref={flame} position={[0, 0.65, 0.25]}>
        <coneGeometry args={[0.12, 0.35, 8]} />
        <meshBasicMaterial color="#ffb347" toneMapped={false} />
      </mesh>
      {!isLowEnd && (
        <Sparkles
          count={6}
          scale={[0.3, 0.7, 0.3]}
          position={[0, 0.9, 0.3]}
          size={3}
          speed={0.8}
          color="#ffb347"
        />
      )}
    </group>
  );
}

function TorchLights() {
  const refs = useRef<(PointLight | null)[]>([]);
  const order = useRef(TORCHES.map((_, i) => i));
  const dist = useRef(new Float32Array(TORCHES.length));

  useFrame(({ clock }) => {
    const d = dist.current;
    for (let i = 0; i < LIGHT_POS.length; i++) {
      d[i] = Math.hypot(
        LIGHT_POS[i].x - playerPos.x,
        LIGHT_POS[i].z - playerPos.z,
      );
    }
    order.current.sort((a, b) => d[a] - d[b]);

    for (let s = 0; s < POOL; s++) {
      const light = refs.current[s];
      if (!light) continue;
      const i = order.current[s];
      const p = LIGHT_POS[i];
      const t = clock.elapsedTime + i * 1.7;
      const f =
        1 +
        Math.sin(t * 9) * 0.08 +
        Math.sin(t * 23.7) * 0.06 +
        Math.sin(t * 3.1) * 0.05;
      light.position.set(p.x, p.y, p.z);
      light.intensity = BASE * f;
    }
  });

  return (
    <>
      {Array.from({ length: POOL }, (_, s) => (
        <pointLight
          key={s}
          ref={(l) => {
            refs.current[s] = l;
          }}
          color="#ff8a3d"
          intensity={BASE}
          distance={14}
          decay={2}
        />
      ))}
    </>
  );
}

export default function Torches() {
  return (
    <group>
      {TORCHES.map((t, i) => (
        <Flame key={i} {...t} />
      ))}
      <TorchLights />
    </group>
  );
}
