import type { RoomId } from "./config";

export type DecorKind =
  | "bookshelf"
  | "candles"
  | "forge"
  | "anvil"
  | "lava"
  | "frame"
  | "pedestal"
  | "carpet"
  | "banner"
  | "chest"
  | "gold";

export type DecorDef = {
  kind: DecorKind;
  x: number;
  z: number;
  rotY?: number;
  solid?: [number, number];
  size?: [number, number];
  color?: string;
};

const L = Math.PI / 2;
const R = -Math.PI / 2;

export const DECOR: Record<RoomId, DecorDef[]> = {
  about: [
    { kind: "bookshelf", x: -1.6, z: -4.58, solid: [2.4, 0.8] },
    { kind: "bookshelf", x: 1.6, z: -4.58, solid: [2.4, 0.8] },
    { kind: "bookshelf", x: -4.58, z: 0, rotY: L, solid: [2.4, 0.8] },
    { kind: "bookshelf", x: 4.58, z: 0, rotY: R, solid: [2.4, 0.8] },
    { kind: "candles", x: 0, z: 0 },
  ],

  skills: [
    { kind: "forge", x: 0, z: -4.2, solid: [3, 1.2] },
    { kind: "anvil", x: -2.4, z: -1.2, solid: [1.1, 0.5] },
    { kind: "lava", x: -3.5, z: 0, size: [1.4, 4.2], solid: [1.7, 4.5] },
    { kind: "lava", x: 3.5, z: 0, size: [1.4, 4.2], solid: [1.7, 4.5] },
  ],

  projects: [
    { kind: "frame", x: -2.2, z: -4.93, color: "#ff7ab6" },
    { kind: "frame", x: 0, z: -4.93, color: "#7cc4ff" },
    { kind: "frame", x: 2.2, z: -4.93, color: "#ffc857" },
    { kind: "frame", x: -4.93, z: 0, rotY: L, color: "#8cff8c" },
    { kind: "frame", x: 4.93, z: 0, rotY: R, color: "#b48cff" },
    { kind: "pedestal", x: -2.7, z: 1.2, solid: [0.8, 0.8] },
    { kind: "pedestal", x: 2.7, z: 1.2, solid: [0.8, 0.8] },
  ],

  experience: [
    { kind: "carpet", x: 0, z: 2.95, size: [1.8, 4.1] },
    { kind: "banner", x: -1.6, z: -4.93, color: "#8a1c1c" },
    { kind: "banner", x: 1.6, z: -4.93, color: "#8a1c1c" },
    { kind: "banner", x: -4.93, z: -2, rotY: L, color: "#a8741a" },
    { kind: "banner", x: -4.93, z: 2, rotY: L, color: "#a8741a" },
    { kind: "banner", x: 4.93, z: -2, rotY: R, color: "#a8741a" },
    { kind: "banner", x: 4.93, z: 2, rotY: R, color: "#a8741a" },
  ],

  contact: [
    { kind: "chest", x: -1.6, z: -4.4, solid: [1.3, 0.8] },
    { kind: "chest", x: 1.6, z: -4.4, solid: [1.3, 0.8] },
    { kind: "gold", x: 0, z: -3.5 },
    { kind: "gold", x: -2.7, z: 1.5 },
    { kind: "gold", x: 2.7, z: 1.5 },
  ],
};
