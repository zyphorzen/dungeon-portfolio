import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import type { PropDef } from "./config";
import { PROPS } from "./layout";
import Interactable from "../interaction/Interactable";
import { ROOMS } from "./config";

const stone = { color: "#4a443d", roughness: 0.95 } as const;

function Pillar() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.4, 1.1]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.45, 5.2, 12]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 5.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.4, 1.1]} />
        <meshStandardMaterial {...stone} />
      </mesh>
    </group>
  );
}

function Barrel() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.9, 12]} />
        <meshStandardMaterial color="#5a3d22" roughness={1} />
      </mesh>
      {[0.25, 0.65].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.41, 0.03, 6, 16]} />
          <meshStandardMaterial
            color="#2b2b2b"
            metalness={0.6}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

function Crate() {
  return (
    <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshStandardMaterial color="#5a4328" roughness={1} />
    </mesh>
  );
}

function Altar({ accent = "#d9a441" }: { accent?: string }) {
  const crystal = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const c = crystal.current;
    if (!c) return;
    c.rotation.y = clock.elapsedTime * 0.8;
    c.position.y = 1.9 + Math.sin(clock.elapsedTime * 1.5) * 0.08;
  });

  return (
    <group>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.5, 1.6]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.6, 1.1]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 1.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.12, 1.4]} />
        <meshStandardMaterial color="#5a534a" roughness={0.9} />
      </mesh>
      <mesh ref={crystal} position={[0, 1.9, 0]}>
        <octahedronGeometry args={[0.28]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Cincin rune di lantai */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.3, 48]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function renderProp(p: PropDef) {
  switch (p.type) {
    case "pillar":
      return <Pillar />;
    case "barrel":
      return <Barrel />;
    case "crate":
      return <Crate />;
    case "altar":
      return <Altar accent={p.accent} />;
  }
}

export default function Props() {
  return (
    <group>
      {PROPS.map((p, i) => (
        <group key={i}>
          <group
            position={[p.pos[0], 0, p.pos[1]]}
            rotation={[0, p.rotY ?? 0, 0]}
          >
            {renderProp(p)}
          </group>
          {p.roomId && (
            <Interactable
              id={`altar-${p.roomId}`}
              label={`Periksa altar ${ROOMS.find((r) => r.id === p.roomId)?.label}`}
              position={p.pos}
              onInteract={() => console.log("interact:", p.roomId)}
            />
          )}
        </group>
      ))}
    </group>
  );
}
