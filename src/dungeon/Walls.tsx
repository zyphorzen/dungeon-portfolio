import { WALLS } from "./config";

export default function Walls() {
  return (
    <group>
      {WALLS.map((w, i) => (
        <mesh key={i} position={w.pos} castShadow receiveShadow>
          <boxGeometry args={w.size} />
          <meshStandardMaterial color="#3a342e" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
