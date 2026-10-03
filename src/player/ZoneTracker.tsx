import { useFrame } from "@react-three/fiber";
import { HUB, ROOM, ROOMS } from "../dungeon/config";
import { ROOM_CENTERS } from "../dungeon/layout";
import { setZone } from "../ui/gameStore";
import { playerPos } from "./state";

const rh = ROOM.size / 2;
const hh = HUB.size / 2;

export default function ZoneTracker() {
  useFrame(() => {
    const { x, z } = playerPos;
    for (const r of ROOMS) {
      const [cx, cz] = ROOM_CENTERS[r.id];
      if (Math.abs(x - cx) <= rh && Math.abs(z - cz) <= rh)
        return setZone(r.label);
    }
    setZone(Math.abs(x) <= hh && Math.abs(z) <= hh ? "Hub" : "Koridor");
  });
  return null;
}
