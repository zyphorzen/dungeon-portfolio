import { DOOR, HUB } from "./config";
import { DOORS } from "./layout";

const hw = DOOR.width / 2;
const T = HUB.wallThickness;

export default function Doors() {
  return (
    <group>
      {DOORS.map((d, i) => (
        <group
          key={i}
          position={d.pos}
          rotation={[0, d.axis === "z" ? Math.PI / 2 : 0, 0]}
        >
          {[-1, 1].map((s) => (
            <mesh
              key={s}
              position={[s * (hw + 0.2), DOOR.height / 2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.4, DOOR.height, T + 0.3]} />
              <meshStandardMaterial color="#4a423a" roughness={0.9} />
            </mesh>
          ))}
          <mesh position={[0, DOOR.height - 0.15, 0]} castShadow receiveShadow>
            <boxGeometry args={[DOOR.width + 0.8, 0.3, T + 0.3]} />
            <meshStandardMaterial color="#4a423a" roughness={0.9} />
          </mesh>
          <mesh
            position={[0, (DOOR.height + HUB.wallHeight) / 2, 0]}
            castShadow
            receiveShadow
          >
            <boxGeometry
              args={[DOOR.width + 0.8, HUB.wallHeight - DOOR.height, T]}
            />
            <meshStandardMaterial color="#3a342e" roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
