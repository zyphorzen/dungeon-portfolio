export const HUB = { size: 24, wallHeight: 6, wallThickness: 1 } as const;
export const DOOR = { width: 4, height: 4 } as const;
export const ROOM = { size: 10 } as const;
export const CORRIDOR = 4;

export type Side = "N" | "S" | "E" | "W";
export type RoomId = "about" | "skills" | "projects" | "experience" | "contact";
export type PropType = "pillar" | "barrel" | "crate" | "altar";

export type WallDef = {
  pos: [number, number, number];
  size: [number, number, number];
};
export type DoorDef = { pos: [number, number, number]; axis: "x" | "z" };
export type FloorDef = {
  pos: [number, number];
  size: [number, number];
  color: string;
};
export type TorchDef = { pos: [number, number, number]; rotY: number };
export type PropDef = {
  type: PropType;
  pos: [number, number];
  rotY?: number;
  accent?: string;
  roomId?: RoomId;
};
export type RoomDef = {
  id: RoomId;
  label: string;
  hubSide: Side;
  hubOffset: number;
  accent: string;
};

export const ROOMS: RoomDef[] = [
  {
    id: "about",
    label: "About",
    hubSide: "N",
    hubOffset: -7,
    accent: "#7cc4ff",
  },
  {
    id: "skills",
    label: "Skills",
    hubSide: "N",
    hubOffset: 7,
    accent: "#8cff8c",
  },
  {
    id: "projects",
    label: "Projects",
    hubSide: "E",
    hubOffset: 0,
    accent: "#ff7ab6",
  },
  {
    id: "experience",
    label: "Experience",
    hubSide: "W",
    hubOffset: 0,
    accent: "#ffc857",
  },
  {
    id: "contact",
    label: "Contact",
    hubSide: "S",
    hubOffset: 0,
    accent: "#b48cff",
  },
];
