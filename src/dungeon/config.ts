export const HUB = {
    size: 24,
    wallHeight: 6,
    wallThickness: 1,
} as const

export type WallDef = {
    pos: [number, number, number]
    size: [number, number, number]
}

const { size: s, wallHeight: h, wallThickness: t } = HUB
const o = s / 2 + t / 2

export const WALLS: WallDef[] = [
    { pos: [0, h / 2, -o], size: [s + t * 2, h, t] },
    { pos: [0, h / 2, o], size: [s + t * 2, h, t] },
    { pos: [-o, h / 2, 0], size: [t, h, s] },
    { pos: [o, h / 2, 0], size: [t, h, s] },
]