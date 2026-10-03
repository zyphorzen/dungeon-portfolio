import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, PointLight } from "three";
import type { TorchDef } from "./config";
import { TORCHES } from "./layout";
import { Sparkles } from "@react-three/drei";

const BASE = 35;

function Torch({ pos, rotY }: TorchDef) {
  const light = useRef<PointLight>(null);
  const flame = useRef<Mesh>(null);
  const seed = pos[0] * 1.7 + pos[2] * 2.3;

  useFrame(({ clock }) => {
    const t = clock.elapsedTime + seed;
    const f =
      1 +
      Math.sin(t * 9) * 0.08 +
      Math.sin(t * 23.7) * 0.06 +
      Math.sin(t * 3.1) * 0.05;
    if (light.current) light.current.intensity = BASE * f;
    if (flame.current) flame.current.scale.set(1, f, 1);
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
      <pointLight
        ref={light}
        position={[0, 0.75, 0.4]}
        color="#ff8a3d"
        intensity={BASE}
        distance={14}
        decay={2}
      />
      <Sparkles
        count={6}
        scale={[0.3, 0.7, 0.3]}
        position={[0, 0.9, 0.3]}
        size={3}
        speed={0.8}
        color="#ffb347"
      />
    </group>
  );
}

export default function Torches() {
  return (
    <group>
      {TORCHES.map((t, i) => (
        <Torch key={i} {...t} />
      ))}
    </group>
  );
}
