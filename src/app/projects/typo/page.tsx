'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { load } from 'opentype.js'
import { useConfig, makeSeparator, makeButton, makeFolder } from '@/app/hooks/useConfig'
import { Box } from '@/app/components/Box'
import { PROJECTS } from '@/app/constants/projects'
import { Scene } from './Scene'
import { convertFont, getFontOptions } from './helpers/fonts'

const Page = () => {
  const [fontOptions, setFontOptions] = useState<any>([])
  const [fontData, setFontData] = useState<any>(null)

  useEffect(() => {
    (async () => {
      setFontOptions(await getFontOptions())
    })()
  }, [])

  const { config, reset } = useConfig({
    ...makeFolder('config', {
      ...(fontOptions.length && {
        fonts: { type: 'options', label: 'font', options: fontOptions, value: fontOptions[0].value }
      }),
      color: { value: PROJECTS[1].color },
      bgColor: { value: '#1c1c1c' },
      amount: { value: 10, min: 5, max: 100, step: 1 },
      offset: { value: 40, min: -100, max: 100, step: 1 },
      posY: { value: -5, min: -50, max: 50, step: 1 },
      ...makeSeparator(),
      objectRotation: { label: 'object ⟳', value: 5, min: -100, max: 100, step: 1 },
      zoom: { value: 30, min: 1, max: 500, step: 10 },
      ...makeSeparator(),
      lights: { value: true },
      wireframe: { value: true },
      ...makeSeparator(),
      ...makeButton('reset', () => reset())
    })
  })

  useEffect(() => {
    if (!config.font) return

    (async () => {
      const font = await load(config.font as unknown as string)
      setFontData(convertFont(font))
    })()
  }, [config])

  return (
    <Box
      css={{
        width: '100%',
        div: { mih: '100vh' },
        backgroundColor: config?.bgColor
      }}
    >
      <Canvas shadows>
        <Scene config={config} fontData={fontData} />
      </Canvas>
    </Box>
  )
}

export default Page
