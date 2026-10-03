import Floor from "./Floor";
import Walls from "./Walls";
import Doors from "./Doors";
import Torches from "./Torches";
import Props from "./Props";

export default function Dungeon() {
  return (
    <group>
      <Floor />
      <Walls />
      <Doors />
      <Torches />
      <Props />
      <group position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh>
          <ringGeometry args={[3, 3.15, 64]} />
          <meshBasicMaterial
            color="#d9a441"
            transparent
            opacity={0.5}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[1.5, 1.58, 64]} />
          <meshBasicMaterial
            color="#d9a441"
            transparent
            opacity={0.35}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
