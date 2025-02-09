'use client'

import { useMemo } from 'react'
import { DoubleSide, MeshBasicMaterial } from 'three'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as NoiseJS from 'noisejs'
import { getTerrainGeometry } from './geometries'

export const Scene = ({ config, shouldRegenerate }: any) => {
  const material = new MeshBasicMaterial({
    vertexColors: true,
    wireframe: config.wireframe,
    side: DoubleSide
  })

  const newNoisePattern = useMemo(() => new NoiseJS.Noise(Math.random()), [shouldRegenerate])
  const terrainGeometry = getTerrainGeometry(config, newNoisePattern)

  return (
    <group>
      <PerspectiveCamera makeDefault position={[100, 0, 0]}>
        <ambientLight />
        { config.lights && (
          <directionalLight castShadow position={[0, 800, 0]} shadow-mapSize={[800, 800]} intensity={5} />
        ) }
      </PerspectiveCamera>

      <group scale={0.2} position={[0, config.posY, 0]}>
        <mesh
          geometry={terrainGeometry}
          material={material}
        />
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
