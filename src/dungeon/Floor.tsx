import { FLOORS } from "./layout";

export default function Floor() {
  return (
    <group>
      {FLOORS.map((f, i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[f.pos[0], 0, f.pos[1]]}
          receiveShadow
        >
          <planeGeometry args={f.size} />
          <meshStandardMaterial color={f.color} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}
