import { DOOR } from "../dungeon/config";
import { COLLIDERS, DOORS } from "../dungeon/layout";
import { doorOpen } from "../dungeon/doorState";

type Box = { minX: number; maxX: number; minZ: number; maxZ: number };

const boxes: Box[] = COLLIDERS.map(({ pos, size }) => ({
  minX: pos[0] - size[0] / 2,
  maxX: pos[0] + size[0] / 2,
  minZ: pos[2] - size[2] / 2,
  maxZ: pos[2] + size[2] / 2,
}));

const HW = DOOR.width / 2;
const HT = 0.15;
const doorBoxes: Box[] = DOORS.map((d) =>
  d.axis === "x"
    ? {
        minX: d.pos[0] - HW,
        maxX: d.pos[0] + HW,
        minZ: d.pos[2] - HT,
        maxZ: d.pos[2] + HT,
      }
    : {
        minX: d.pos[0] - HT,
        maxX: d.pos[0] + HT,
        minZ: d.pos[2] - HW,
        maxZ: d.pos[2] + HW,
      },
);
const OPEN_ENOUGH = 0.9;

let ox = 0;
let oz = 0;

function push(b: Box, x: number, z: number, r: number) {
  ox = x;
  oz = z;
  const cx = Math.max(b.minX, Math.min(x, b.maxX));
  const cz = Math.max(b.minZ, Math.min(z, b.maxZ));
  const dx = x - cx;
  const dz = z - cz;
  const d2 = dx * dx + dz * dz;
  if (d2 < r * r && d2 > 1e-8) {
    const d = Math.sqrt(d2);
    ox = cx + (dx / d) * r;
    oz = cz + (dz / d) * r;
  }
}

export function resolveCollision(
  x: number,
  z: number,
  radius: number,
): [number, number] {
  for (const b of boxes) {
    push(b, x, z, radius);
    x = ox;
    z = oz;
  }
  for (let i = 0; i < doorBoxes.length; i++) {
    if (doorOpen[i] >= OPEN_ENOUGH) continue;
    push(doorBoxes[i], x, z, radius);
    x = ox;
    z = oz;
  }
  return [x, z];
}

function hit(b: Box, x: number, z: number, r: number) {
  const dx = x - Math.max(b.minX, Math.min(x, b.maxX));
  const dz = z - Math.max(b.minZ, Math.min(z, b.maxZ));
  return dx * dx + dz * dz < r * r;
}

export function isBlocked(x: number, z: number, radius: number): boolean {
  for (const b of boxes) if (hit(b, x, z, radius)) return true;
  for (let i = 0; i < doorBoxes.length; i++) {
    if (doorOpen[i] < OPEN_ENOUGH && hit(doorBoxes[i], x, z, radius))
      return true;
  }
  return false;
}
