import { CORRIDOR, DOOR, HUB, ROOM, ROOMS } from "./config";
import type {
  DoorDef,
  FloorDef,
  PropDef,
  PropType,
  RoomId,
  Side,
  TorchDef,
  WallDef,
} from "./config";

export const WALLS: WallDef[] = [];
export const DOORS: DoorDef[] = [];
export const FLOORS: FloorDef[] = [];
export const TORCHES: TorchDef[] = [];
export const PROPS: PropDef[] = [];
export const ROOM_CENTERS = {} as Record<RoomId, [number, number]>;

const DIR: Record<Side, [number, number]> = {
  N: [0, -1],
  S: [0, 1],
  E: [1, 0],
  W: [-1, 0],
};
const OPP: Record<Side, Side> = { N: "S", S: "N", E: "W", W: "E" };

const H = HUB.wallHeight;
const T = HUB.wallThickness;
const hubHalf = HUB.size / 2;
const roomHalf = ROOM.size / 2;
const ROOM_DIST = hubHalf + T + CORRIDOR + T + roomHalf;

function wall(
  axis: "x" | "z",
  fixed: number,
  from: number,
  to: number,
  gaps: number[] = [],
) {
  const hw = DOOR.width / 2;
  const add = (a: number, b: number) => {
    const len = b - a;
    if (len < 0.01) return;
    const mid = (a + b) / 2;
    WALLS.push(
      axis === "x"
        ? { pos: [mid, H / 2, fixed], size: [len, H, T] }
        : { pos: [fixed, H / 2, mid], size: [T, H, len] },
    );
  };
  let cursor = from;
  for (const g of [...gaps].sort((a, b) => a - b)) {
    add(cursor, g - hw);
    cursor = g + hw;
    DOORS.push({ pos: axis === "x" ? [g, 0, fixed] : [fixed, 0, g], axis });
  }
  add(cursor, to);
}

const gapsFor = (s: Side) =>
  ROOMS.filter((r) => r.hubSide === s).map((r) => r.hubOffset);
const ho = hubHalf + T / 2;
const hl = hubHalf + T;
wall("x", -ho, -hl, hl, gapsFor("N"));
wall("x", ho, -hl, hl, gapsFor("S"));
wall("z", -ho, -hubHalf, hubHalf, gapsFor("W"));
wall("z", ho, -hubHalf, hubHalf, gapsFor("E"));
FLOORS.push({ pos: [0, 0], size: [HUB.size, HUB.size], color: "#2a2622" });

const hi = hubHalf - 0.15;
const TY = 2.6;
TORCHES.push(
  { pos: [0, TY, -hi], rotY: 0 },
  { pos: [-5, TY, hi], rotY: Math.PI },
  { pos: [5, TY, hi], rotY: Math.PI },
  { pos: [-hi, TY, -5], rotY: Math.PI / 2 },
  { pos: [-hi, TY, 5], rotY: Math.PI / 2 },
  { pos: [hi, TY, -5], rotY: -Math.PI / 2 },
  { pos: [hi, TY, 5], rotY: -Math.PI / 2 },
);

PROPS.push(
  { type: "pillar", pos: [-5, -5] },
  { type: "pillar", pos: [5, -5] },
  { type: "pillar", pos: [-5, 5] },
  { type: "pillar", pos: [5, 5] },
  { type: "barrel", pos: [-10.6, -10.6] },
  { type: "barrel", pos: [-10.6, -9.4] },
  { type: "barrel", pos: [10.6, -10.6] },
  { type: "crate", pos: [10.5, 10.5] },
  { type: "crate", pos: [10.4, 9.3], rotY: 0.3 },
  { type: "crate", pos: [-10.5, 10.5], rotY: -0.2 },
);

for (const r of ROOMS) {
  const [dx, dz] = DIR[r.hubSide];
  const sgn = dx + dz;
  const lat = r.hubOffset;
  const cx = dx !== 0 ? dx * ROOM_DIST : lat;
  const cz = dz !== 0 ? dz * ROOM_DIST : lat;
  const door = OPP[r.hubSide];
  ROOM_CENTERS[r.id] = [cx, cz];

  FLOORS.push({
    pos: [cx, cz],
    size: [ROOM.size, ROOM.size],
    color: "#272320",
  });
  const cLen = 2 * T + CORRIDOR;
  const cMid = sgn * (hubHalf + cLen / 2);
  FLOORS.push(
    dz !== 0
      ? { pos: [lat, cMid], size: [DOOR.width, cLen], color: "#23201c" }
      : { pos: [cMid, lat], size: [cLen, DOOR.width], color: "#23201c" },
  );

  const a = hubHalf + T;
  const b = a + CORRIDOR;
  const lo = sgn > 0 ? a : -b;
  const hiC = sgn > 0 ? b : -a;
  for (const side of [-1, 1]) {
    const f = lat + side * (DOOR.width / 2 + T / 2);
    if (dz !== 0) wall("z", f, lo, hiC);
    else wall("x", f, lo, hiC);
  }

  const ro = roomHalf + T / 2;
  const rl = roomHalf + T;
  wall("x", cz - ro, cx - rl, cx + rl, door === "N" ? [cx] : []);
  wall("x", cz + ro, cx - rl, cx + rl, door === "S" ? [cx] : []);
  wall("z", cx - ro, cz - roomHalf, cz + roomHalf, door === "W" ? [cz] : []);
  wall("z", cx + ro, cz - roomHalf, cz + roomHalf, door === "E" ? [cz] : []);

  const [tx, tz] = DIR[door];
  TORCHES.push({
    pos: [cx - tx * (roomHalf - 0.15), TY, cz - tz * (roomHalf - 0.15)],
    rotY: Math.atan2(tx, tz),
  });

  const c = 3.7;
  PROPS.push(
    { type: "altar", pos: [cx, cz], accent: r.accent, roomId: r.id },
    { type: "pillar", pos: [cx - c, cz - c] },
    { type: "pillar", pos: [cx + c, cz - c] },
    { type: "barrel", pos: [cx - c, cz + c] },
    { type: "crate", pos: [cx + c, cz + c], rotY: 0.4 },
  );
}

const PROP_SIZE: Record<PropType, number> = {
  pillar: 1,
  barrel: 0.9,
  crate: 1,
  altar: 1.8,
};

export const COLLIDERS: WallDef[] = [
  ...WALLS,
  ...PROPS.map<WallDef>((p) => {
    const s = PROP_SIZE[p.type];
    return { pos: [p.pos[0], H / 2, p.pos[1]], size: [s, H, s] };
  }),
];
