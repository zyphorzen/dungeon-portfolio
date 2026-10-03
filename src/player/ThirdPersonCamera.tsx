import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { HUB } from "../dungeon/config";
import { look, playerPos } from "./state";

const DISTANCE = 6;
const TARGET_HEIGHT = 1.4;
const SENSITIVITY = 0.0025;
const LIMIT = HUB.size / 2 - 0.3;

const target = new Vector3();
const desired = new Vector3();

export default function ThirdPersonCamera() {
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const el = gl.domElement;
    const locked = () => document.pointerLockElement === el;

    const onClick = () => {
      if (!locked()) el.requestPointerLock();
    };
    const onMove = (e: MouseEvent) => {
      if (!locked()) return;
      look.yaw -= e.movementX * SENSITIVITY;
      look.pitch = Math.max(
        0.05,
        Math.min(1.2, look.pitch + e.movementY * SENSITIVITY),
      );
    };

    el.addEventListener("click", onClick);
    document.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("click", onClick);
      document.removeEventListener("mousemove", onMove);
    };
  }, [gl]);

  useFrame(({ camera }, delta) => {
    target.set(playerPos.x, TARGET_HEIGHT, playerPos.z);
    const cp = Math.cos(look.pitch);
    desired.set(
      target.x + Math.sin(look.yaw) * cp * DISTANCE,
      target.y + Math.sin(look.pitch) * DISTANCE,
      target.z + Math.cos(look.yaw) * cp * DISTANCE,
    );

    desired.x = Math.max(-LIMIT, Math.min(LIMIT, desired.x));
    desired.z = Math.max(-LIMIT, Math.min(LIMIT, desired.z));

    camera.position.lerp(desired, 1 - Math.exp(-Math.min(delta, 0.05) * 14));
    camera.lookAt(target);
  });

  return null;
}
