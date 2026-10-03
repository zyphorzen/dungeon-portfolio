import { Canvas } from "@react-three/fiber";
import Dungeon from "../dungeon/Dungeon";
import Lighting from "../dungeon/Lighting";
import Player from "../player/Player";
import ThirdPersonCamera from "../player/ThirdPersonCamera";
import ZoneTracker from "../player/ZoneTracker";
import InteractionSystem from "../interaction/InteractionSystem";

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [0, 5, 6], fov: 60 }}>
      <color attach="background" args={["#0a0a0f"]} />
      <fogExp2 attach="fog" args={["#0a0a0f", 0.035]} />
      <Lighting />
      <Dungeon />
      <Player />
      <ThirdPersonCamera />
      <InteractionSystem />
      <ZoneTracker />
    </Canvas>
  );
}
