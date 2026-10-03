import { ROOMS } from "./config";
import { DECOR } from "./decor";
import type { DecorDef } from "./decor";
import { ROOM_CENTERS, ROOM_ROT } from "./layout";
import {
  Anvil,
  Banner,
  Bookshelf,
  Candles,
  Carpet,
  Chest,
  Forge,
  Frame,
  Gold,
  Lava,
  Pedestal,
} from "./kit";

function Item({ d }: { d: DecorDef }) {
  switch (d.kind) {
    case "bookshelf":
      return <Bookshelf />;
    case "candles":
      return <Candles />;
    case "forge":
      return <Forge />;
    case "anvil":
      return <Anvil />;
    case "lava":
      return <Lava size={d.size} />;
    case "frame":
      return <Frame color={d.color} />;
    case "pedestal":
      return <Pedestal />;
    case "carpet":
      return <Carpet size={d.size} />;
    case "banner":
      return <Banner color={d.color} />;
    case "chest":
      return <Chest />;
    case "gold":
      return <Gold />;
  }
}

export default function RoomDecor() {
  return (
    <group>
      {ROOMS.map((r) => {
        const [cx, cz] = ROOM_CENTERS[r.id];
        return (
          <group
            key={r.id}
            position={[cx, 0, cz]}
            rotation={[0, ROOM_ROT[r.id], 0]}
          >
            {DECOR[r.id].map((d, i) => (
              <group
                key={i}
                position={[d.x, 0, d.z]}
                rotation={[0, d.rotY ?? 0, 0]}
              >
                <Item d={d} />
              </group>
            ))}
          </group>
        );
      })}
    </group>
  );
}
