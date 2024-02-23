import { QuadraticBezierCurve3, Vector3 } from "three";
import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const Playground = () => {
  const { camera } = useThree();

  const curve = new QuadraticBezierCurve3(
    new Vector3( -10, 0, 0 ),
    new Vector3( 0, 10, 0 ),
    new Vector3( 10, 0, 0 )
  );

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 20, 1, 20, false]} />
        <meshBasicMaterial color='red' />
      </mesh>

      <OrbitControls
        camera={camera}
        minDistance={95}
        autoRotate={false}
        enableZoom={false}
        enablePan={false}
        target={[0.5, 1.5, 0.5]}
        minPolarAngle={1.5}
        maxPolarAngle={1.5}
      />
    </>
  )
}
