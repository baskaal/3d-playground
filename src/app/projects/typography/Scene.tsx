'use client'

import { useRef } from 'react'
import { MathUtils } from 'three'
import { useFrame } from '@react-three/fiber'
import { Center, OrbitControls, PerspectiveCamera, Text3D } from '@react-three/drei'
import { random, sample, times } from 'lodash'

export const Scene = ({ settings, fontData }: any) => {
  const objectRef = useRef<any>()

  const getCharacter = (index: number): string => {
    const splitChars = settings.characters?.split('') || []
    if (!splitChars.length) return String.fromCharCode(random(32, 127))
    if (settings.shuffleCharacters) return sample(splitChars)
    return splitChars[index % splitChars.length]
  }

  useFrame((state, renderPriority) => {
    if (!objectRef.current || !settings.objectRotation) return
    objectRef.current.rotation.y += (renderPriority * (settings.objectRotation / 10))
  })

  return fontData && (
    <group>
      <PerspectiveCamera makeDefault position={[100, 0, 0]}>
        <ambientLight />
        {settings.lights && (
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
        position={[0, -5 + (settings.posY || 0), 0]}
        rotation={[0, 0, MathUtils.degToRad(90)]}
      >
        { times(settings.amount, (i) => (
          <mesh rotation={[MathUtils.degToRad((360 / settings.amount) * i), 0, MathUtils.degToRad(180)]}>
            <Center
              rotation={[0, 0, MathUtils.degToRad(90)]}
              position={[0, -(settings.offset || 0), 0]}
              disableY
            >
              <Text3D
                rotation={[0, MathUtils.degToRad(-90), 0]}
                font={fontData}
                size={settings.size}
                height={settings.depth}
                bevelEnabled={true}
                bevelSize={settings.bevelSize / 25}
                bevelThickness={settings.bevelThickness / 25}
                bevelSegments={settings.bevelSegments}
                curveSegments={settings.curveSegments}
                smooth={0}
                castShadow
                receiveShadow
              >
                { getCharacter(i) }
                <meshPhongMaterial
                  color={settings.color}
                  shininess={500}
                />
              </Text3D>
            </Center>
          </mesh>
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
