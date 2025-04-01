'use client'

import { useRef } from 'react'
import { MathUtils } from 'three'
import { OrbitControls, PerspectiveCamera, Text3D } from '@react-three/drei'
import { sample, times } from 'lodash'
import { useFrame } from '@react-three/fiber'

export const Scene = ({ config }: any) => {
  const objectRef = useRef<any>()

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180)
  }

  const getCharacter = () => {
    return sample(times(100, i => String.fromCharCode(i + 32)))?.toUpperCase()
  }

  useFrame((state, renderPriority) => {
    if (!config.objectRotation) return
    objectRef.current.rotation.y += (renderPriority * (config.objectRotation / 10))
  })

  return (
    <group>
      <PerspectiveCamera makeDefault position={[100, 0, 0]}>
        <ambientLight castShadow />
        {config.lights && (
          <directionalLight
            position={[0, 800, 1000]}
            shadow-mapSize={[800, 800]}
            intensity={5}
          />
        )}
      </PerspectiveCamera>

      <group scale={0.2} ref={objectRef} position={[0, config.posY, 0]} rotation={[0, 0, MathUtils.degToRad(90)]}>
        { times(config.amount, (i) => (
          <mesh rotation={[getRotation(config.amount, i), 0, MathUtils.degToRad(180)]}>
            <Text3D
              rotation={[0, 0, MathUtils.degToRad(90)]}
              position={[-5, 0, config.offset]}
              font="/assets/Roboto_Medium_Regular.json"
              letterSpacing={0}
              lineHeight={1}
              size={12}
              height={4}
              bevelEnabled={true}
              bevelThickness={0.5}
              bevelSize={0.5}
              bevelOffset={0}
              bevelSegments={10}
              curveSegments={10}
              smooth={0}
              castShadow
              receiveShadow
            >
              { getCharacter() }
              <meshPhongMaterial
                color={config.color}
                shininess={500}
              />
            </Text3D>
          </mesh>
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
