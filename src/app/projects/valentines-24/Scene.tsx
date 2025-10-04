'use client'

import { useRef } from 'react'
import { times } from 'lodash'
import { MeshPhongMaterial } from 'three'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Object } from './Object'
import { getGeometryOne, getGeometryTwo } from './geometries'

export const Scene = ({ settings }: any) => {
  const objectRef = useRef<any>()

  useFrame((state, renderPriority) => {
    if (!settings.objectRotation) return

    objectRef.current.rotation.x += (renderPriority * (settings.objectRotation / 10))
  })

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180)
  }

  const material = new MeshPhongMaterial({
    color: settings.color,
    wireframe: settings.wireframe,
    shininess: 500
  })

  const shapes = [
    { geometry: getGeometryOne(), position: [0, 0, settings.offset] },
    { geometry: getGeometryTwo(), position: [50, -100, settings.offset], rotation: [0, 0, Math.PI] }
  ]

  return (
    <group>
      <PerspectiveCamera makeDefault position={[100, 0, 0]}>
        <ambientLight />
        { settings.lights && (
          <directionalLight castShadow position={[0, 800, 0]} shadow-mapSize={[800, 800]} intensity={5} />
        ) }
      </PerspectiveCamera>

      <group scale={0.2} ref={objectRef}>
        { times(settings.amount, (i) => (
          <Object
            shapes={shapes}
            material={material}
            settings={settings}
            rotation={getRotation(settings.amount, i)}
            key={`object-${i}`}
          />
        )) }
      </group>

      <OrbitControls
        minDistance={settings.zoom}
        maxDistance={settings.zoom}
        autoRotate={!!settings.sceneRotation}
        autoRotateSpeed={settings.sceneRotation}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
    </group>
  )
}
