'use client'

import { useRef } from 'react'
import { MathUtils } from 'three'
import { useFrame } from '@react-three/fiber'
import { Center, OrbitControls, PerspectiveCamera, Text3D } from '@react-three/drei'
import { random, times } from 'lodash'

export const Scene = ({ settings, fontData }: any) => {
  const objectRef = useRef<any>()

  const getCharacter = (index: number): string => {
    const splitChars = settings.characters?.split('') || []
    if (!splitChars.length) return String.fromCharCode(random(32, 127))
    return splitChars[index % splitChars.length]
  }

  useFrame((state, renderPriority) => {
    if (!objectRef.current || !settings.objectRotation) return
    objectRef.current.rotation.y += (renderPriority * (settings.objectRotation / 10))
  })

  return fontData && (
    <group>
      <PerspectiveCamera makeDefault position={[100, 0, 0]} />

      <ambientLight />
      {settings.lights && (
        <directionalLight
          position={[500, 500, 0]}
          shadow-mapSize={[5000, 5000]}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          shadow-camera-near={0}
          shadow-camera-far={5000}
          intensity={5}
          castShadow
        />
      )}

      <group
        ref={objectRef}
        position={[0, -50 + (settings.posY || 0), 0]}
        rotation={[0, 0, MathUtils.degToRad(90)]}
      >
        { times(settings.amount, (i) => (
          <mesh
            key={i}
            rotation={[MathUtils.degToRad((360 / settings.amount) * i), 0, MathUtils.degToRad(180)]}
            castShadow
          >
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

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -51 + (settings.posY || 0), 0]}
        receiveShadow
      >
        <circleGeometry args={[1000, 1000]} />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>

      <OrbitControls
        minDistance={settings.zoom}
        maxDistance={settings.zoom}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
      />
    </group>
  )
}
