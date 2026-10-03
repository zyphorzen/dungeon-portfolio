import { useMemo } from "react";
import type { WallDef } from "./config";
import { WALLS } from "./layout";
import { stoneTexture } from "./textures";

function WallMesh({ pos, size }: WallDef) {
  const map = useMemo(
    () => stoneTexture(Math.max(size[0], size[2]) / 4, size[1] / 4),
    [size],
  );
  return (
    <mesh position={pos} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial map={map} color="#6b6258" roughness={1} />
    </mesh>
  );
}

export default function Walls() {
  return (
    <group>
      {WALLS.map((w, i) => (
        <WallMesh key={i} {...w} />
      ))}
    </group>
  );
}
