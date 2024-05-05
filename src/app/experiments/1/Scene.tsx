'use client'

import { useRef } from 'react'
import { times } from 'lodash'
import { MeshPhongMaterial } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Object } from './Object'
import { getGeometryOne, getGeometryTwo } from './geometries'

export const Scene = ({ config }: any) => {
  const objectRef = useRef<any>()
  const { camera } = useThree()

  useFrame((state, renderPriority) => {
    if (!config.rotateObject) return

    objectRef.current.rotation.x += (renderPriority * config.objectRotationSpeed)
  })

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180)
  }

  const material = new MeshPhongMaterial({
    color: config.color,
    wireframe: config.wireframe
  })

  const shapes = [
    { geometry: getGeometryOne(), position: [0, 0, config.offset] },
    { geometry: getGeometryTwo(), position: [50, -100, config.offset], rotation: [0, 0, Math.PI] }
  ]

  return (
    <group scale={0.2}>
      <ambientLight />

      { config.lights && (
        <directionalLight castShadow position={[0, 800, 0]} shadow-mapSize={[800, 800]} intensity={5}>
          <orthographicCamera args={[-10, 10, 10, -10]} />
        </directionalLight>
      )}

      <mesh ref={objectRef}>
        { times(config.amount, (i) => (
          <Object
            shapes={shapes}
            material={material}
            config={config}
            rotation={getRotation(config.amount, i)}
            key={`object-${i}`}
          />
        )) }
      </mesh>

      <OrbitControls
        camera={camera}
        minDistance={config.zoom}
        maxDistance={config.zoom}
        autoRotate={config.rotateScene}
        autoRotateSpeed={config.sceneRotationSpeed}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
        minPolarAngle={1.5}
        maxPolarAngle={1.5}
      />
    </group>
  )
}
