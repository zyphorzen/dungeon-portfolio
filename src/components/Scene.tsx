import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import Dungeon from "../dungeon/Dungeon";
import Lighting from "../dungeon/Lighting";
import Player from "../player/Player";
import ThirdPersonCamera from "../player/ThirdPersonCamera";
import ZoneTracker from "../player/ZoneTracker";
import InteractionSystem from "../interaction/InteractionSystem";
import { isLowEnd } from "../utils/device";

export default function Scene() {
  const [dpr, setDpr] = useState(isLowEnd ? 1 : 1.5);

  return (
    <Canvas
      shadows={!isLowEnd}
      dpr={dpr}
      gl={{ powerPreference: "high-performance", antialias: !isLowEnd }}
      camera={{ position: [0, 5, 6], fov: 60 }}
    >
      <PerformanceMonitor
        onChange={({ factor }) => setDpr(isLowEnd ? 1 : 1 + 0.5 * factor)}
      />
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
