'use client'

import { Canvas } from '@react-three/fiber'
import { useConfig, makeSeparator, makeButton } from '@/app/hooks/useConfig'
import { Box } from '@/app/components/Box'
import { Scene } from './Scene'
import { useReducer } from 'react'
import randomColor from 'randomcolor'

const Page = () => {
  const [color, refreshColor] = useReducer(() => randomColor(), randomColor())

  const { settings, reset } = useConfig({
    color: { value: color },
    bgColor: { value: '#1c1c1c' },
    amount: { value: 25, min: 5, max: 100, step: 1 },
    offset: { value: 5, min: -100, max: 100, step: 1 },
    ...makeSeparator(),
    objectRotation: { label: 'object ⟳', value: 5, min: -100, max: 100, step: 1 },
    sceneRotation: { label: 'scene ⟳', value: 5, min: -100, max: 100, step: 1 },
    zoom: { value: 100, min: 1, max: 500, step: 10 },
    ...makeSeparator(),
    lights: { value: true },
    edges: { value: true },
    wireframe: { value: false },
    ...makeSeparator(),
    ...makeButton('reset', () => {
      reset()
      refreshColor()
    }),
    ...makeSeparator(),
    
  })

  return (
    <Box css={{
      width: '100%',
      div: { mih: '100vh' },
      backgroundColor: settings?.bgColor
    }}>
      <Canvas>
        <Scene settings={settings} />
      </Canvas>
    </Box>
  )
}

export default Page
