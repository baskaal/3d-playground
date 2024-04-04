import { QuadraticBezierCurve3, Shape, Vector3 } from "three";
import { Edges } from "@react-three/drei";
import { brighten } from '3oilerplate';

export const CustomShape = ({ rotation, config }: any) => {
  const curve = new QuadraticBezierCurve3(
    new Vector3(-10, 0, config.offset),
    new Vector3(0, 0, config.offset + 10),
    new Vector3(10, 0, config.offset)
  );

  const fullLength = 150;
  const fullWidth = 20;
  const thickness = 1;

  const innerLength = fullLength * 0.7;
  const halfWidth = fullWidth / 2;

  const shape = new Shape();
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
    x + halfWidth + (halfWidth / 1.5),
    y + innerLength,
    x + halfWidth,
    y + innerLength
  );

  shape.bezierCurveTo(
    x + halfWidth - (halfWidth / 1.5),
    y + innerLength,
    x + thickness,
    y + 0,
    x + thickness,
    y + 0
  );

  shape.moveTo(x + 10, y + 0);

  const extrudeSettings = {
    depth: 0.25,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1
  };

  return (
    <mesh rotation={[rotation, 0, 0]}>
      <mesh>
        <tubeGeometry args={[curve, 20, 1, 10, false]} />
        <meshLambertMaterial
          color={config.color}
          transparent={true}
          opacity={.95}
          wireframe={config.wireframe}
        />
        { config.edges && <Edges color={brighten(config.color, 1.5)} /> }
      </mesh>
      <mesh position={[10, -100, config.offset]} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshLambertMaterial
          color={config.color}
          transparent={true}
          opacity={.95}
          wireframe={config.wireframe}
        />
        { config.edges && <Edges color={brighten(config.color, 1.5)} /> }
      </mesh>
    </mesh>
  )
}
