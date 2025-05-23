'use client'

import { useRef } from 'react'
import { MathUtils } from 'three'
import { useFrame } from '@react-three/fiber'
import { Center, OrbitControls, PerspectiveCamera, Text3D } from '@react-three/drei'
import { random, sample, times } from 'lodash'

export const Scene = ({ config, fontData }: any) => {
  const objectRef = useRef<any>()

  const getCharacter = (index: number): string => {
    const splitChars = config.characters?.split('') || []
    if (!splitChars.length) return String.fromCharCode(random(32, 127))
    if (config.shuffleCharacters) return sample(splitChars)
    return splitChars[index % splitChars.length]
  }

  useFrame((state, renderPriority) => {
    if (!objectRef.current || !config.objectRotation) return
    objectRef.current.rotation.y += (renderPriority * (config.objectRotation / 10))
  })

  return fontData && (
    <group>
      <PerspectiveCamera makeDefault position={[100, 0, 0]}>
        <ambientLight />
        {config.lights && (
          <directionalLight
            position={[0, 800, 1000]}
            shadow-mapSize={[800, 800]}
            intensity={5}
            castShadow
          />
        )}
      </PerspectiveCamera>

      <group
        scale={0.1}
        ref={objectRef}
        position={[0, -5 + (config.posY || 0), 0]}
        rotation={[0, 0, MathUtils.degToRad(90)]}
      >
        { times(config.amount, (i) => (
          <mesh rotation={[MathUtils.degToRad((360 / config.amount) * i), 0, MathUtils.degToRad(180)]}>
            <Center
              rotation={[0, 0, MathUtils.degToRad(90)]}
              position={[0, -(config.offset || 0), 0]}
              disableY
            >
              <Text3D
                rotation={[0, MathUtils.degToRad(-90), 0]}
                font={fontData}
                size={config.size}
                height={config.depth}
                bevelEnabled={true}
                bevelSize={config.bevelSize / 25}
                bevelThickness={config.bevelThickness / 25}
                bevelSegments={config.bevelSegments / 5}
                curveSegments={config.curveSegments / 5}
                smooth={0}
                castShadow
                receiveShadow
              >
                { getCharacter(i) }
                <meshPhongMaterial
                  color={config.color}
                  shininess={500}
                />
              </Text3D>
            </Center>
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
