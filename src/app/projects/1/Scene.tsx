'use client'

import { useRef } from 'react'
import { times } from 'lodash'
import { MeshPhongMaterial } from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Object } from './Object'
import { getGeometryOne, getGeometryTwo } from './geometries'

export const Scene = ({ config }: any) => {
  const objectRef = useRef<any>()

  useFrame((state, renderPriority) => {
    if (!config.objectRotation) return

    objectRef.current.rotation.x += (renderPriority * (config.objectRotation / 10))
  })

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180)
  }

  const material = new MeshPhongMaterial({
    color: config.color,
    wireframe: config.wireframe,
    shininess: 500
  })

  const shapes = [
    { geometry: getGeometryOne(), position: [0, 0, config.offset] },
    { geometry: getGeometryTwo(), position: [50, -100, config.offset], rotation: [0, 0, Math.PI] }
  ]

  return (
    <group>
      <PerspectiveCamera makeDefault position={[100, 0, 0]}>
        <ambientLight />
        { config.lights && (
          <directionalLight castShadow position={[0, 800, 0]} shadow-mapSize={[800, 800]} intensity={5} />
        ) }
      </PerspectiveCamera>

      <group scale={0.2} ref={objectRef}>
        { times(config.amount, (i) => (
          <Object
            shapes={shapes}
            material={material}
            config={config}
            rotation={getRotation(config.amount, i)}
            key={`object-${i}`}
          />
        )) }
      </group>

      <OrbitControls
        minDistance={config.zoom}
        maxDistance={config.zoom}
        autoRotate={!!config.sceneRotation}
        autoRotateSpeed={config.sceneRotation}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
    </group>
  )
}
