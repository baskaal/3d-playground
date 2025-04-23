'use client'

import { useRef } from 'react'
import { MathUtils } from 'three'
import { useFrame } from '@react-three/fiber'
import { Center, OrbitControls, PerspectiveCamera, Text3D } from '@react-three/drei'
import { random, sample, times } from 'lodash'

export const Scene = ({ config, fontData }: any) => {
  const objectRef = useRef<any>()

  const getCharacter = (index: number): string => {
    const characters = config.characters?.split('') || []
    const character = config.shuffleCharacters ? sample(characters) : characters[index % characters.length]
    return config.characters ? character : String.fromCharCode(random(32, 150))
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
                letterSpacing={0}
                lineHeight={1}
                size={config.size}
                height={4}
                bevelEnabled={true}
                bevelThickness={config.bevelThickness / 100}
                bevelSize={config.bevelSize / 100}
                bevelOffset={config.bevelOffset / 100}
                bevelSegments={config.bevelSegments / 100}
                curveSegments={config.curveSegments}
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
