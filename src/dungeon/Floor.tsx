import { useMemo } from "react";
import type { FloorDef } from "./config";
import { FLOORS } from "./layout";
import { stoneTexture } from "./textures";

function FloorMesh({ pos, size, color }: FloorDef) {
  const map = useMemo(() => stoneTexture(size[0] / 4, size[1] / 4), [size]);
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[pos[0], 0, pos[1]]}
      receiveShadow
    >
      <planeGeometry args={size} />
      <meshStandardMaterial map={map} color={color} roughness={0.95} />
    </mesh>
  );
}

export default function Floor() {
  return (
    <group>
      {FLOORS.map((f, i) => (
        <FloorMesh key={i} {...f} />
      ))}
    </group>
  );
}
