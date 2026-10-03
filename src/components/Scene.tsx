import { Canvas } from "@react-three/fiber";
import Floor from "../dungeon/Floor";
import Walls from "../dungeon/Walls";
import Lighting from "../dungeon/Lighting";
import Player from "../player/Player";
import ThirdPersonCamera from "../player/ThirdPersonCamera";

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 6], fov: 60 }}>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 10, 40]} />
      <Lighting />
      <Floor />
      <Walls />
      <Player />
      <ThirdPersonCamera />
    </Canvas>
  );
}
