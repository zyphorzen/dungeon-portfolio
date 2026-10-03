import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Floor from "../dungeon/Floor";
import Walls from "../dungeon/Walls";
import Lighting from "../dungeon/Lighting";

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 9, 15], fov: 60 }}>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 10, 40]} />
      <Lighting />
      <Floor />
      <Walls />
      <OrbitControls maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}
