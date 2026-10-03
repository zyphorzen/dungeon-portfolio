export default function Lighting() {
  return (
    <>
      <hemisphereLight args={["#3a3a5a", "#1a120a", 0.45]} />
      <pointLight
        position={[0, 4.5, 0]}
        color="#ff8a3d"
        intensity={40}
        distance={20}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </>
  );
}
