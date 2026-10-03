import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Group } from "three";
import { DOOR, HUB } from "./config";
import type { DoorDef } from "./config";
import { DOORS } from "./layout";
import { doorOpen } from "./doorState";
import { playerPos } from "../player/state";
import { playDoor } from "../audio/audio";
import { isLowEnd } from "../utils/device";

const hw = DOOR.width / 2;
const T = HUB.wallThickness;
const LEAF_H = DOOR.height - 0.15;
const OPEN_DIST = 6;
const SPEED = 2;

const frameMat = { color: "#4a423a", roughness: 0.9 } as const;

function Leaf() {
  return (
    <>
      <mesh position={[0, LEAF_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[hw + 0.04, LEAF_H, 0.3]} />
        <meshStandardMaterial color="#3b2a1a" roughness={1} />
      </mesh>
      {[0.8, LEAF_H - 0.8].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[hw + 0.04, 0.16, 0.36]} />
          <meshStandardMaterial
            color="#25272b"
            metalness={0.7}
            roughness={0.5}
          />
        </mesh>
      ))}
    </>
  );
}

function Door({ index, pos, axis }: DoorDef & { index: number }) {
  const left = useRef<Group>(null);
  const right = useRef<Group>(null);
  const dust = useRef<Group>(null);
  const wanted = useRef(false);

  useFrame((_, delta) => {
    const l = left.current;
    const r = right.current;
    if (!l || !r) return;

    const d = Math.hypot(playerPos.x - pos[0], playerPos.z - pos[2]);
    const want = d < OPEN_DIST + (wanted.current ? 1 : 0);
    if (want !== wanted.current) {
      wanted.current = want;
      playDoor(want);
    }

    const dt = Math.min(delta, 0.05);
    const cur = doorOpen[index];
    const next = want
      ? Math.min(1, cur + dt * SPEED)
      : Math.max(0, cur - dt * SPEED);
    doorOpen[index] = next;

    l.position.x = -hw / 2 - next * hw;
    r.position.x = hw / 2 + next * hw;
    if (dust.current) dust.current.visible = next > 0.02 && next < 0.98;
  });

  return (
    <group position={pos} rotation={[0, axis === "z" ? Math.PI / 2 : 0, 0]}>
      {[-1, 1].map((s) => (
        <mesh
          key={s}
          position={[s * (hw + 0.2), DOOR.height / 2, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.4, DOOR.height, T + 0.3]} />
          <meshStandardMaterial {...frameMat} />
        </mesh>
      ))}
      <mesh position={[0, DOOR.height - 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[DOOR.width + 0.8, 0.3, T + 0.3]} />
        <meshStandardMaterial {...frameMat} />
      </mesh>
      <mesh
        position={[0, (DOOR.height + HUB.wallHeight) / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[DOOR.width + 0.8, HUB.wallHeight - DOOR.height, T]}
        />
        <meshStandardMaterial color="#3a342e" roughness={1} />
      </mesh>

      <group ref={left} position={[-hw / 2, 0, 0]}>
        <Leaf />
      </group>
      <group ref={right} position={[hw / 2, 0, 0]}>
        <Leaf />
      </group>

      {!isLowEnd && (
        <group ref={dust} visible={false}>
          <Sparkles
            count={14}
            scale={[DOOR.width, 1.5, 0.8]}
            position={[0, DOOR.height - 0.5, 0]}
            size={2}
            speed={0.6}
            opacity={0.6}
            color="#bfae94"
          />
        </group>
      )}
    </group>
  );
}

export default function Doors() {
  return (
    <group>
      {DOORS.map((d, i) => (
        <Door key={i} index={i} {...d} />
      ))}
    </group>
  );
}
