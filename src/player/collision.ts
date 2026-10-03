import { WALLS } from '../dungeon/config'

type Box = { minX: number; maxX: number; minZ: number; maxZ: number }

const boxes: Box[] = WALLS.map(({ pos, size }) => ({
    minX: pos[0] - size[0] / 2,
    maxX: pos[0] + size[0] / 2,
    minZ: pos[2] - size[2] / 2,
    maxZ: pos[2] + size[2] / 2,
}))

export function resolveCollision(x: number, z: number, radius: number): [number, number] {
    for (const b of boxes) {
        const cx = Math.max(b.minX, Math.min(x, b.maxX))
        const cz = Math.max(b.minZ, Math.min(z, b.maxZ))
        const dx = x - cx
        const dz = z - cz
        const d2 = dx * dx + dz * dz
        if (d2 < radius * radius && d2 > 1e-8) {
            const d = Math.sqrt(d2)
            x = cx + (dx / d) * radius
            z = cz + (dz / d) * radius
        }
    }
    return [x, z]
}