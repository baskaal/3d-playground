'use client'
import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'
import { useConfig, makeSeparator, makeButton, makeFolder } from '@/app/hooks/useConfig'
import { Box } from '@/app/components/Box'
import { PROJECTS } from '@/app/constants/projects'

const Page = () => {
  const { config, reset } = useConfig({
    ...makeFolder('config', {
      color: { value: PROJECTS[0].color },
      bgColor: { value: '#1c1c1c' },
      amount: { value: 20, min: 5, max: 100, step: 1 },
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
      ...makeButton('reset', () => reset()),
      ...makeSeparator()
    })
  })

  return (
    <Box css={{ width: '100%', div: { mih: '100vh' }, backgroundColor: config?.bgColor }}>
      <Canvas>
        <Scene config={config} />
      </Canvas>
    </Box>
  )
}

export default Page
