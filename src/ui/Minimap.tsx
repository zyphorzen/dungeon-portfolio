import { useEffect, useRef } from "react";
import { ROOMS } from "../dungeon/config";
import { FLOORS, ROOM_CENTERS } from "../dungeon/layout";
import { look, playerPos } from "../player/state";
import { getState } from "./gameStore";

const SIZE = 180;
const PAD = 8;

const minX = Math.min(...FLOORS.map((f) => f.pos[0] - f.size[0] / 2));
const maxX = Math.max(...FLOORS.map((f) => f.pos[0] + f.size[0] / 2));
const minZ = Math.min(...FLOORS.map((f) => f.pos[1] - f.size[1] / 2));
const maxZ = Math.max(...FLOORS.map((f) => f.pos[1] + f.size[1] / 2));
const scale = (SIZE - PAD * 2) / Math.max(maxX - minX, maxZ - minZ);
const offX = (SIZE - (maxX - minX) * scale) / 2;
const offZ = (SIZE - (maxZ - minZ) * scale) / 2;
const mx = (x: number) => offX + (x - minX) * scale;
const mz = (z: number) => offZ + (z - minZ) * scale;

export default function Minimap() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = SIZE * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const base = document.createElement("canvas");
    base.width = base.height = SIZE * dpr;
    const b = base.getContext("2d")!;
    b.scale(dpr, dpr);
    b.fillStyle = "#52483c";
    for (const f of FLOORS) {
      b.fillRect(
        mx(f.pos[0] - f.size[0] / 2),
        mz(f.pos[1] - f.size[1] / 2),
        f.size[0] * scale,
        f.size[1] * scale,
      );
    }

    let raf = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.drawImage(base, 0, 0, SIZE, SIZE);

      const { visited } = getState();
      const next = ROOMS.find((r) => !visited.includes(r.id));
      const pulse = (Math.sin(performance.now() / 300) + 1) / 2;

      for (const r of ROOMS) {
        const [cx, cz] = ROOM_CENTERS[r.id];
        const x = mx(cx);
        const y = mz(cz);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        if (visited.includes(r.id)) {
          ctx.globalAlpha = 0.5;
          ctx.strokeStyle = r.accent;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        } else {
          ctx.fillStyle = r.accent;
          ctx.fill();
        }
        if (r === next) {
          ctx.beginPath();
          ctx.arc(x, y, 6 + pulse * 5, 0, Math.PI * 2);
          ctx.globalAlpha = 1 - pulse;
          ctx.strokeStyle = r.accent;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      ctx.save();
      ctx.translate(mx(playerPos.x), mz(playerPos.z));
      ctx.rotate(-look.yaw);
      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.lineTo(4, 5);
      ctx.lineTo(0, 2.5);
      ctx.lineTo(-4, 5);
      ctx.closePath();
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative h-28 w-28 rounded border border-amber-400/30 bg-black/60 backdrop-blur-sm sm:h-44 sm:w-44">
      <canvas ref={ref} className="h-full w-full" />
      <span className="absolute right-1.5 top-0.5 text-[10px] font-bold text-amber-300/80">
        N
      </span>
    </div>
  );
}
