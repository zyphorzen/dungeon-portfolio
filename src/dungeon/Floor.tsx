import { HUB } from "./config";

export default function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[HUB.size, HUB.size]} />
      <meshStandardMaterial color="#2a2622" roughness={0.95} />
    </mesh>
  );
}
