export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} color="#4a4a6a" />
      <pointLight
        position={[0, 4.5, 0]}
        color="#ff8a3d"
        intensity={120}
        distance={30}
        decay={2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
    </>
  );
}
