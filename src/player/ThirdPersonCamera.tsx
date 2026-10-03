import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { look, playerPos } from "./state";
import { isBlocked } from "./collision";
import { isTouch } from "../utils/device";

const DISTANCE = 6;
const TARGET_HEIGHT = 1.4;
const SENSITIVITY = 0.0025;
const PAD = 0.3;
const STEPS = 12;
const TOUCH_SENS = 0.005;

const target = new Vector3();
const offset = new Vector3();
const desired = new Vector3();

export default function ThirdPersonCamera() {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const el = gl.domElement;
    const locked = () => document.pointerLockElement === el;
    const clampPitch = (p: number) => Math.max(0.05, Math.min(1.2, p));

    const onClick = () => {
      if (!isTouch && !locked()) el.requestPointerLock();
    };
    const onMove = (e: MouseEvent) => {
      if (!locked()) return;
      look.yaw -= e.movementX * SENSITIVITY;
      look.pitch = clampPitch(look.pitch + e.movementY * SENSITIVITY);
    };

    let id: number | null = null;
    let lx = 0;
    let ly = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch" || id !== null) return;
      id = e.pointerId;
      lx = e.clientX;
      ly = e.clientY;
    };
    const onTouchMove = (e: PointerEvent) => {
      if (e.pointerId !== id) return;
      look.yaw -= (e.clientX - lx) * TOUCH_SENS;
      look.pitch = clampPitch(look.pitch + (e.clientY - ly) * TOUCH_SENS);
      lx = e.clientX;
      ly = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerId === id) id = null;
    };

    el.addEventListener("click", onClick);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onTouchMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    document.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onTouchMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      document.removeEventListener("mousemove", onMove);
    };
  }, [gl]);

  useFrame(({ camera }, delta) => {
    target.set(playerPos.x, TARGET_HEIGHT, playerPos.z);
    const cp = Math.cos(look.pitch);
    offset.set(
      Math.sin(look.yaw) * cp * DISTANCE,
      Math.sin(look.pitch) * DISTANCE,
      Math.cos(look.yaw) * cp * DISTANCE,
    );

    let k = 1;
    for (let i = 1; i <= STEPS; i++) {
      const f = i / STEPS;
      if (isBlocked(target.x + offset.x * f, target.z + offset.z * f, PAD)) {
        k = Math.max(0.15, (i - 1) / STEPS);
        break;
      }
    }
    desired.copy(target).addScaledVector(offset, k);

    camera.position.lerp(desired, 1 - Math.exp(-Math.min(delta, 0.05) * 14));
    camera.lookAt(target);
  });

  return null;
}
