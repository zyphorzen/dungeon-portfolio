import { Sparkles } from "@react-three/drei";
import { ROOMS } from "./config";
import { ROOM_CENTERS } from "./layout";

export default function Particles() {
  return (
    <group>
      <Sparkles
        count={120}
        scale={[24, 5, 24]}
        position={[0, 3, 0]}
        size={2}
        speed={0.25}
        opacity={0.5}
        color="#ffcf8a"
      />
      {ROOMS.map((r) => {
        const [x, z] = ROOM_CENTERS[r.id];
        return (
          <Sparkles
            key={r.id}
            count={40}
            scale={[10, 4, 10]}
            position={[x, 2.5, z]}
            size={2.5}
            speed={0.3}
            color={r.accent}
          />
        );
      })}
    </group>
  );
}
