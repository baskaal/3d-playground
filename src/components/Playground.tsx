import { QuadraticBezierCurve3, Shape, Vector3 } from "three";
import { Edges, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { times } from "lodash";

export const Playground = () => {
  const { camera } = useThree();

  const centerDistance = 20;

  const curve = new QuadraticBezierCurve3(
    new Vector3(-10, 0, centerDistance),
    new Vector3(0, 0, centerDistance + 15),
    new Vector3(10, 0, centerDistance)
  );

  const amount = 12;

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180);
  }

  const getRadians = (degrees: number) => {
    return degrees * (Math.PI / 180)
  }

  const shape = new Shape();

  const fullLength = 120;
  const innerLength = fullLength * 0.8;

  const fullWidth = 20
  const halfWidth = fullWidth / 2;

  const thickness = 1;

  const x = 0, y = -100;

  shape.moveTo(x + 0, y + 0);
  shape.lineTo(x + 0, y + 0);

  // shape.bezierCurveTo(
  //   startVector bezier x,
  //   startVector bezier y,
  //   endVector bezier x,
  //   endVector bezier y,
  //   endVector pos x,
  //   endVector pos x,
  // );

  shape.bezierCurveTo(
    x - 0,
    y + 40,
    x + 0,
    y + fullLength,
    x + halfWidth,
    y + fullLength
  );

  shape.bezierCurveTo(
    x + halfWidth + halfWidth,
    y + fullLength,
    x + fullWidth,
    y + fullWidth - thickness,
    x + fullWidth,
    y + 0
  );

  shape.lineTo(x + fullWidth - thickness, y + 0);

  shape.bezierCurveTo(
    x + fullWidth - thickness,
    y + 40,
    x + halfWidth + halfWidth / 1.5,
    y + innerLength,
    x + halfWidth,
    y + innerLength
  );

  shape.bezierCurveTo(
    x + halfWidth - halfWidth / 1.5,
    y + innerLength,
    x + thickness,
    y + 0,
    x + thickness,
    y + 0
  );

  shape.moveTo(x + 10, y + 0);

  shape.closePath();

  const extrudeSettings = { depth: 0.25, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };

  return (
    <>
      { times(amount, (i) => (
        <mesh rotation={[getRotation(amount, i), 0, 0]}>
          <mesh>
            <tubeGeometry args={[curve, 20, 1, 20, false]} />
            <meshBasicMaterial opacity={1} color='red' />
            <Edges color='white' />
          </mesh>
          <mesh position={[10, -100, centerDistance]} rotation={[0, 0, getRadians(180)]}>
            <extrudeGeometry args={[shape, extrudeSettings]} />
            <lineBasicMaterial color='red' />
            <Edges color='white' />
          </mesh>
        </mesh>
      ))}

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
