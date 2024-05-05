'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { times } from 'lodash'
import { CustomShape } from './Shape'

export const Scene = ({ config }: any) => {
  const objectRef = useRef<any>()
  const { camera } = useThree()

  useFrame(() => {
    if (!config.rotateObject) return

    objectRef.current.rotation.x += config.objectRotationSpeed
  })

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180)
  }

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
          <CustomShape key={`shape-${i}`} config={config} rotation={getRotation(config.amount, i)} />
        ))}
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
