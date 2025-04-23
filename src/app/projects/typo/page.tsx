'use client'

import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { load } from 'opentype.js'
import { mapValues } from 'lodash'
import { useConfig, makeSeparator, makeButton } from '@/app/hooks/useConfig'
import { Box } from '@/app/components/Box'
import { PROJECTS } from '@/app/constants/projects'
import { Scene } from './Scene'
import { convertFont, getFontOptions } from './helpers/fonts'

const Page = () => {
  const [fonts, setFonts] = useState<any>(null)
  const [fontVariants, setFontVariants] = useState<any>(null)
  const [fontData, setFontData] = useState<any>(null)

  const fontFamilies = mapValues(fonts, (value, key) => key)

  useEffect(() => {
    (async () => { setFonts(await getFontOptions()) })()
  }, [])

  const { config, reset } = useConfig({
    ...(fontFamilies && {
      fontFamily: { value: Object.values(fontFamilies)[0] || '', options: fontFamilies }
    }),
    ...(fontVariants && {
      fontVariant: { value: Object.values(fontVariants)[0], options: fontVariants }
    }),
    color: { value: PROJECTS[1].color },
    bgColor: { value: '#1c1c1c' },
    amount: { value: 10, min: 5, max: 100, step: 1 },
    offset: { value: 25, min: -100, max: 100, step: 1 },
    posY: { value: -5, min: -50, max: 50, step: 1 },
    ...makeSeparator(),
    objectRotation: { label: 'object ⟳', value: 5, min: -100, max: 100, step: 1 },
    zoom: { value: 50, min: 1, max: 500, step: 10 },
    ...makeSeparator(),
    lights: { value: true },
    wireframe: { value: true },
    ...makeSeparator(),
    ...makeButton('reset', () => reset())
  })

  useEffect(() => {
    if (!fonts) return
    if (!config.fontFamily) return

    setFontVariants(fonts[config.fontFamily])
  }, [fonts, config?.fontFamily])

  useEffect(() => {
    if (!config.fontVariant) return

    (async () => {
      const font = await load(config.fontVariant)
      setFontData(convertFont(font))
    })()
  }, [config?.fontVariant])

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
