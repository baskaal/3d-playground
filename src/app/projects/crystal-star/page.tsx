'use client'

import { useEffect, useReducer } from 'react'
import randomColor from 'randomcolor'
import { useConfig, makeSeparator, makeButton } from '@/app/hooks/useConfig'
import { Canvas } from '@/app/components'
import { Scene } from './Scene'

const Page = () => {
  const [color, refreshColor] = useReducer(() => randomColor(), randomColor())

  const { settings, reset, destroy } = useConfig({
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
    credits: { value: '' }
  })

  useEffect(() => {
    return destroy
  }, [])

  return (
    <Canvas settings={settings}>
      <Scene settings={settings} />
    </Canvas>
  )
}

export default Page
