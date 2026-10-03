import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import type { Group, Mesh } from "three";
import { motion } from "./state";
import { markSceneReady } from "../ui/gameStore";

const URL = `${import.meta.env.BASE_URL}models/Soldier.glb`;

export default function Character() {
  const group = useRef<Group>(null);
  const current = useRef("");
  const { scene, animations } = useGLTF(URL);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((o) => {
      if ((o as Mesh).isMesh) o.castShadow = true;
    });
    markSceneReady();
  }, [scene]);

  useFrame(() => {
    const name = motion.speed > 6 ? "Run" : motion.speed > 0 ? "Walk" : "Idle";
    if (name === current.current) return;
    actions[name]?.reset().fadeIn(0.2).play();
    actions[current.current]?.fadeOut(0.2);
    current.current = name;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(URL);
