import { Sparkles } from "@react-three/drei";
import { ROOMS } from "./config";
import { ROOM_CENTERS } from "./layout";
import { isLowEnd } from "../utils/device";

export default function Particles() {
  const K = isLowEnd ? 0.4 : 1;
  return (
    <group>
      <Sparkles
        count={Math.round(120 * K)}
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
            count={Math.round(40 * K)}
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
