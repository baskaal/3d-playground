import { DoubleSide, QuadraticBezierCurve3, Shape, Vector3 } from 'three'
import { Edges, Mask, useMask } from '@react-three/drei'
import { brighten } from '3oilerplate'

export const CustomShape = ({ rotation, config }: any) => {
  const curve = new QuadraticBezierCurve3(
    new Vector3(-48, -4.5, -1 + config.offset),
    new Vector3(0, -4.5, -1 + config.offset + 50),
    new Vector3(48, -4.5, -1 + config.offset)
  )

  const fullLength = 750
  const fullWidth = 100
  const thickness = 8

  const innerLength = fullLength * 0.7
  const halfWidth = fullWidth / 2

  const shape = new Shape()
  const x = 0; const y = -100

  shape.moveTo(x + 0, y + 0)
  shape.lineTo(x + 0, y + 0)

  shape.bezierCurveTo(
    x - 0,
    y + 40,
    x + 0,
    y + fullLength,
    x + halfWidth,
    y + fullLength
  )

  shape.bezierCurveTo(
    x + fullWidth,
    y + fullLength,
    x + fullWidth,
    y + fullWidth - thickness,
    x + fullWidth,
    y + 0
  )

  shape.lineTo(x + fullWidth - thickness, y + 0)

  shape.bezierCurveTo(
    x + fullWidth - thickness,
    y + 40,
    x + halfWidth + (halfWidth / 1.5),
    y + innerLength,
    x + halfWidth,
    y + innerLength
  )

  shape.bezierCurveTo(
    x + halfWidth - (halfWidth / 1.5),
    y + innerLength,
    x + thickness,
    y + 0,
    x + thickness,
    y + 0
  )

  shape.moveTo(x + 10, y + 0)

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: 1,
    bevelThickness: 1
  }

  const maskProps = useMask(1, false)

  return (
    <mesh rotation={[rotation, 0, 0]}>
      <mesh>
        <tubeGeometry args={[curve, 20, 4, 20, false]} />
        <meshPhongMaterial
          color={config.color}
          wireframe={config.wireframe}
          side={DoubleSide}
          {...maskProps}
        />
        { config.edges && <Edges color={brighten(config.color, 1.5)} /> }
      </mesh>

      <Mask colorWrite={false} depthWrite={false} position={[0, 0, 66]} id={1}>
        <boxGeometry args={[120, 20, 30]} />
        <meshBasicMaterial />
      </Mask>

      <mesh position={[50, -100, config.offset]} rotation={[0, 0, Math.PI]}>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhongMaterial
          color={config.color}
          wireframe={config.wireframe}
        />
        { config.edges && <Edges color={brighten(config.color, 1.5)} /> }
      </mesh>
    </mesh>
  )
}
