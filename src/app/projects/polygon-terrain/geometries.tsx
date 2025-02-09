import { Color, DisplayP3ColorSpace, Float32BufferAttribute, PlaneGeometry, Vector3 } from 'three'
import * as NoiseJS from 'noisejs'
import { random } from 'lodash'
import TinyColor from 'tinycolor2'

let noisePattern = new NoiseJS.Noise(Math.random())
const vertex = new Vector3()
const vertexColor = new Color()

const map = (val: number, smin: number, smax: number, emin: number, emax: number) => {
  const t = (val - smin) / (smax - smin)
  return (emax - emin) * t + emin
}

const noise = (x: number, y: number) => {
  return map(noisePattern.perlin2(x, y), -1, 1, 0, 1)
}

const octave = (x: number, y: number, octaves: number) => {
  let val = 0
  let freq = 1
  let max = 0
  let amp = 1

  for (let i = 0; i < octaves; i++) {
    val += noise(x * freq, y * freq) * amp
    max += amp
    amp /= 2
    freq *= 2
  }

  return val / max
}

const getRandomTone = (color: any): [number, number, number] => {
  const modifier = random(-25, 25)
  const r = (color.r + modifier) / 255
  const g = (color.g + modifier) / 255
  const b = (color.b + modifier) / 255

  return [r, g, b]
}

const generateTexture = (width: number, height: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = width + 1
  canvas.height = height + 1

  const context = canvas.getContext('2d')!
  context.fillStyle = 'black'
  context.fillRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < canvas.width; i++) {
    for (let j = 0; j < canvas.height; j++) {
      const v = octave(i / canvas.width, j / canvas.height, 16)
      const per = (100 * v).toFixed(2) + '%'
      context.fillStyle = `rgb(${per},${per},${per})`
      context.fillRect(i, j, 1, 1)
    }
  }

  return context.getImageData(0, 0, canvas.width, canvas.height, { colorSpace: 'display-p3' })
}

export const getTerrainGeometry = ({ width, height, depth, detail, color }: any, newNoise?: any) => {
  if (!width || !height) return

  if (newNoise) { noisePattern = newNoise }

  const widthSegments = width / ((100 - detail) || 1)
  const heightSegments = height / ((100 - detail) || 1)
  const texture = generateTexture(widthSegments, heightSegments)

  let terrainGeometry = new PlaneGeometry(width, height, widthSegments, heightSegments)
  terrainGeometry.rotateX(Math.PI / 2)

  let position = terrainGeometry.attributes.position

  for (let i = 0; i < position.count; i++) {
    const tone = texture.data[i * 4]
    vertex.fromBufferAttribute(position, i)
    vertex.y += map(tone, 0, 255, -10, 10) * (depth / 10)
    position.setY(i, vertex.y)
  }

  terrainGeometry = terrainGeometry.toNonIndexed() as any

  position = terrainGeometry.attributes.position

  const vertexColors = []

  for (let i = 0; i < position.count; i++) {
    const rgb = new TinyColor(color).toRgb()
    vertexColor.setRGB(...getRandomTone(rgb), DisplayP3ColorSpace)
    vertexColors.push(vertexColor.r, vertexColor.g, vertexColor.b)
  }

  terrainGeometry.setAttribute('color', new Float32BufferAttribute(vertexColors, 3))

  return terrainGeometry
}
