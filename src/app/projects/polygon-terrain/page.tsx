'use client'
import { useReducer } from 'react'
import { Canvas } from '@react-three/fiber'
import { useConfig, makeSeparator, makeButton, makeFolder } from '@/app/hooks/useConfig'
import { Box } from '@/app/components/Box'
import { PROJECTS } from '@/app/constants/projects'
import { Scene } from './Scene'

const Page = () => {
  const [shouldRegenerate, regenerate] = useReducer(value => value + 1, 0)
  const { config, reset } = useConfig({
    ...makeFolder('config', {
      color: { value: PROJECTS[1].color },
      bgColor: { value: '#1c1c1c' },
      width: { value: 420, min: 100, max: 1000, step: 10 },
      height: { value: 420, min: 100, max: 1000, step: 10 },
      depth: { value: 250, min: 0, max: 500, step: 1 },
      detail: { value: 75, min: 1, max: 100, step: 1 },
      posY: { value: -25, min: -50, max: 50, step: 1 },
      ...makeSeparator(),
      sceneRotation: { label: 'scene ⟳', value: 5, min: -20, max: 20, step: 1 },
      zoom: { value: 120, min: 1, max: 500, step: 10 },
      ...makeSeparator(),
      lights: { value: true },
      wireframe: { value: true },
      ...makeSeparator(),
      ...makeButton('regenerate', () => regenerate()),
      ...makeSeparator(),
      ...makeButton('reset', () => reset())
    })
  })

  return (
    <Box css={{ width: '100%', div: { mih: '100vh' }, backgroundColor: config?.bgColor }}>
      <Canvas>
        <Scene config={config} shouldRegenerate={shouldRegenerate} />
      </Canvas>
    </Box>
  )
}

export default Page
