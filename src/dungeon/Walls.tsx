import { HUB } from "./config";

type Wall = { pos: [number, number, number]; size: [number, number, number] };

const { size: s, wallHeight: h, wallThickness: t } = HUB;
const offset = s / 2 + t / 2;

const walls: Wall[] = [
  { pos: [0, h / 2, -offset], size: [s + t * 2, h, t] },
  { pos: [0, h / 2, offset], size: [s + t * 2, h, t] },
  { pos: [-offset, h / 2, 0], size: [t, h, s] },
  { pos: [offset, h / 2, 0], size: [t, h, s] },
];

export default function Walls() {
  return (
    <group>
      {walls.map((w, i) => (
        <mesh key={i} position={w.pos} castShadow receiveShadow>
          <boxGeometry args={w.size} />
          <meshStandardMaterial color="#3a342e" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
