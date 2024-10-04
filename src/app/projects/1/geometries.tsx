import { CatmullRomCurve3, ExtrudeGeometry, Shape, TubeGeometry, Vector3 } from 'three'

export const getGeometryOne = () => {
  const curveBase: number[][] = [
    [46, -4.5, 1],
    [44, -4.5, 10],
    [40, -4.5, 20],
    [35, -4.5, 27],
    [24, -4.5, 35],
    [12, -4.5, 39]
  ]

  const curve = new CatmullRomCurve3([
    ...curveBase.map(([o, ...rest]) => new Vector3(-o, ...rest)),
    new Vector3(0, -4.5, 40),
    ...curveBase.reverse().map(([o, ...rest]) => new Vector3(o, ...rest))
  ])

  return new TubeGeometry(curve, 20, 5, 20, false)
}

export const getGeometryTwo = () => {
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

  return new ExtrudeGeometry(shape, extrudeSettings)
}
