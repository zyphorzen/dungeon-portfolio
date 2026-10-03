import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace, Vector3 } from "three";
import type { Group, MeshStandardMaterial } from "three";
import { playerPos } from "../player/state";
import { isLowEnd } from "../utils/device";

const stone = { color: "#4a443d", roughness: 0.95 } as const;
const wood = { color: "#3b2a1a", roughness: 1 } as const;
const iron = { color: "#25272b", metalness: 0.7, roughness: 0.5 } as const;
const goldMat = {
  color: "#d9a441",
  metalness: 0.9,
  roughness: 0.3,
  emissive: "#6b4a10",
} as const;
const tmp = new Vector3();

let booksTex: CanvasTexture | null = null;
function booksTexture() {
  if (booksTex) return booksTex;
  const W = 256;
  const H = 384;
  const rows = 5;
  const rh = H / rows;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  let seed = 11;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  const pal = [
    "#6b2b2b",
    "#2b4a6b",
    "#2f5a3a",
    "#6b5a2b",
    "#4a2b6b",
    "#5a3a22",
    "#3a3a4a",
  ];
  g.fillStyle = "#1a120a";
  g.fillRect(0, 0, W, H);
  for (let r = 0; r < rows; r++) {
    let x = 4;
    while (x < W - 8) {
      const w = 8 + rnd() * 12;
      const h = rh * (0.62 + rnd() * 0.3);
      const y = (r + 1) * rh - 6 - h;
      g.fillStyle = pal[Math.floor(rnd() * pal.length)];
      g.fillRect(x, y, w, h);
      g.fillStyle = "rgba(255,220,150,0.25)";
      g.fillRect(x + 1, y + 6, w - 2, 2);
      x += w + 1;
    }
    g.fillStyle = "#4a3320";
    g.fillRect(0, (r + 1) * rh - 6, W, 6);
  }
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = 4;
  booksTex = t;
  return t;
}

export function Bookshelf() {
  return (
    <group>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[2.4, 3.6, 0.8]} />
        <meshStandardMaterial {...wood} />
      </mesh>
      <mesh position={[0, 1.8, 0.405]}>
        <planeGeometry args={[2.2, 3.4]} />
        <meshStandardMaterial map={booksTexture()} roughness={1} />
      </mesh>
    </group>
  );
}

export function Candles() {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    const g = ref.current;
    if (!g) return;
    const t = clock.elapsedTime;
    g.rotation.y = t * 0.3;
    g.children.forEach((c, i) => {
      c.position.y = 2.3 + Math.sin(t * 1.4 + i * 1.3) * 0.12;
    });
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2;
        return (
          <group key={i} position={[Math.cos(a) * 1.7, 2.3, Math.sin(a) * 1.7]}>
            <mesh>
              <cylinderGeometry args={[0.06, 0.06, 0.28, 8]} />
              <meshStandardMaterial color="#e8dcc0" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
              <coneGeometry args={[0.05, 0.14, 6]} />
              <meshBasicMaterial color="#ffc46b" toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export function Forge() {
  return (
    <group>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[3, 2.2, 1.2]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 3.6, -0.2]}>
        <boxGeometry args={[1.4, 2.8, 0.8]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 0.9, 0.61]}>
        <planeGeometry args={[1.8, 1]} />
        <meshBasicMaterial color="#ff6a1a" toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.45, 0.64]}>
        <boxGeometry args={[2.1, 0.14, 0.1]} />
        <meshStandardMaterial {...iron} />
      </mesh>
      {!isLowEnd && (
        <Sparkles
          count={14}
          scale={[1.6, 1.4, 0.6]}
          position={[0, 1.3, 0.8]}
          size={3}
          speed={0.9}
          color="#ff9a3d"
        />
      )}
    </group>
  );
}

export function Anvil() {
  return (
    <group>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.4]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <boxGeometry args={[1.1, 0.24, 0.45]} />
        <meshStandardMaterial {...iron} />
      </mesh>
      <mesh position={[0.65, 0.62, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.2, 0.3, 4]} />
        <meshStandardMaterial {...iron} />
      </mesh>
    </group>
  );
}

export function Lava({ size = [1.4, 4.2] }: { size?: [number, number] }) {
  const mat = useRef<MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (mat.current)
      mat.current.emissiveIntensity =
        1.6 + Math.sin(clock.elapsedTime * 2) * 0.4;
  });
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[size[0] + 0.3, 0.1, size[1] + 0.3]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <mesh position={[0, 0.105, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={size} />
        <meshStandardMaterial
          ref={mat}
          color="#401000"
          emissive="#ff4500"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
      {!isLowEnd && (
        <Sparkles
          count={14}
          scale={[size[0], 1.5, size[1]]}
          position={[0, 0.8, 0]}
          size={2.5}
          speed={0.5}
          color="#ff7a2a"
        />
      )}
    </group>
  );
}

export function Frame({ color = "#ffc857" }: { color?: string }) {
  return (
    <group position={[0, 2.4, 0]}>
      <mesh>
        <boxGeometry args={[1.8, 1.3, 0.12]} />
        <meshStandardMaterial color="#3b2a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#111"
          emissive={color}
          emissiveIntensity={0.9}
        />
      </mesh>
    </group>
  );
}

export function Pedestal() {
  const gem = useRef<Group>(null);
  useFrame(({ clock }) => {
    const g = gem.current;
    if (!g) return;
    g.rotation.y = clock.elapsedTime;
    g.position.y = 1.7 + Math.sin(clock.elapsedTime * 1.6) * 0.06;
  });
  return (
    <group>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.8, 1.1, 0.8]} />
        <meshStandardMaterial {...stone} />
      </mesh>
      <group ref={gem} position={[0, 1.7, 0]}>
        <mesh>
          <icosahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color="#111"
            emissive="#ff7ab6"
            emissiveIntensity={1.5}
            wireframe
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}

export function Carpet({ size = [1.8, 4] }: { size?: [number, number] }) {
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[size[0] + 0.25, size[1] + 0.25]} />
        <meshStandardMaterial color="#a8741a" roughness={1} />
      </mesh>
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={size} />
        <meshStandardMaterial color="#5a1414" roughness={1} />
      </mesh>
    </group>
  );
}

export function Banner({ color = "#8a1c1c" }: { color?: string }) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (ref.current)
      ref.current.rotation.z =
        Math.sin(clock.elapsedTime * 0.9 + ref.current.position.x) * 0.025;
  });
  return (
    <group>
      <mesh position={[0, 5.25, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.1, 6]} />
        <meshStandardMaterial {...iron} />
      </mesh>
      <group ref={ref} position={[0, 5.2, 0.05]}>
        <mesh position={[0, -1.3, 0]}>
          <boxGeometry args={[0.9, 2.6, 0.03]} />
          <meshStandardMaterial color={color} roughness={1} />
        </mesh>
        <mesh position={[0, -1.1, 0.03]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.35, 0.35]} />
          <meshStandardMaterial
            color="#111"
            emissive="#ffc857"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

export function Chest() {
  const root = useRef<Group>(null);
  const lid = useRef<Group>(null);
  const glow = useRef<Group>(null);
  const spark = useRef<Group>(null);
  const open = useRef(0);

  useFrame((_, delta) => {
    if (!root.current || !lid.current) return;
    root.current.getWorldPosition(tmp);
    const near = Math.hypot(playerPos.x - tmp.x, playerPos.z - tmp.z) < 3.5;
    open.current += ((near ? 1 : 0) - open.current) * Math.min(1, delta * 4);
    const o = open.current;
    lid.current.rotation.x = -o * 1.9;
    glow.current?.scale.setScalar(Math.max(0.001, o));
    if (spark.current) spark.current.visible = o > 0.3;
  });

  return (
    <group ref={root}>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.3, 0.6, 0.8]} />
        <meshStandardMaterial {...wood} />
      </mesh>
      {[-0.4, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.3, 0]}>
          <boxGeometry args={[0.1, 0.62, 0.84]} />
          <meshStandardMaterial {...iron} />
        </mesh>
      ))}
      <group ref={glow}>
        <mesh position={[0, 0.58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.15, 0.65]} />
          <meshBasicMaterial color="#ffd36b" toneMapped={false} />
        </mesh>
      </group>
      <group ref={lid} position={[0, 0.6, -0.4]}>
        <mesh position={[0, 0.15, 0.4]}>
          <boxGeometry args={[1.3, 0.3, 0.8]} />
          <meshStandardMaterial {...wood} />
        </mesh>
        {[-0.4, 0.4].map((x) => (
          <mesh key={x} position={[x, 0.15, 0.4]}>
            <boxGeometry args={[0.1, 0.32, 0.84]} />
            <meshStandardMaterial {...iron} />
          </mesh>
        ))}
      </group>
      {!isLowEnd && (
        <group ref={spark} visible={false}>
          <Sparkles
            count={16}
            scale={[1.1, 1.2, 0.7]}
            position={[0, 1, 0]}
            size={3}
            speed={0.6}
            color="#ffd36b"
          />
        </group>
      )}
    </group>
  );
}

export function Gold() {
  return (
    <group>
      <mesh position={[0, 0.18, 0]} scale={[1, 0.45, 1]}>
        <sphereGeometry args={[0.7, 12, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <mesh position={[0.55, 0.1, 0.3]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[0.4, 10, 6]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      <mesh position={[-0.5, 0.1, 0.35]} scale={[1, 0.4, 1]}>
        <sphereGeometry args={[0.35, 10, 6]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {[
        [0.2, 0.42, 0.1],
        [-0.15, 0.4, 0.2],
        [0.05, 0.45, -0.1],
      ].map((p, i) => (
        <mesh
          key={i}
          position={[p[0], p[1], p[2]]}
          rotation={[0.4 * i, 0, 0.3 * i]}
        >
          <cylinderGeometry args={[0.1, 0.1, 0.02, 12]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
      ))}
    </group>
  );
}
