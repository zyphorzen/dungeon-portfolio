import { useRef } from "react";
import type { PointerEvent } from "react";
import { input } from "../player/input";

const R = 48;

export default function Joystick() {
  const base = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLDivElement>(null);
  const active = useRef(false);

  const update = (e: PointerEvent) => {
    const b = base.current;
    const k = knob.current;
    if (!b || !k) return;
    const r = b.getBoundingClientRect();
    let dx = e.clientX - (r.left + r.width / 2);
    let dy = e.clientY - (r.top + r.height / 2);
    const d = Math.hypot(dx, dy);
    if (d > R) {
      dx = (dx / d) * R;
      dy = (dy / d) * R;
    }
    k.style.transform = `translate(${dx}px, ${dy}px)`;
    const dead = Math.hypot(dx, dy) / R < 0.2;
    input.moveX = dead ? 0 : dx / R;
    input.moveZ = dead ? 0 : -dy / R;
  };

  const end = () => {
    active.current = false;
    input.moveX = 0;
    input.moveZ = 0;
    if (knob.current) knob.current.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={base}
      className="pointer-events-auto absolute bottom-8 left-8 flex h-32 w-32 touch-none items-center justify-center rounded-full border border-amber-400/40 bg-black/40"
      onPointerDown={(e) => {
        active.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e);
      }}
      onPointerMove={(e) => active.current && update(e)}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <div
        ref={knob}
        className="h-14 w-14 rounded-full border border-amber-300/60 bg-amber-300/20"
      />
    </div>
  );
}
