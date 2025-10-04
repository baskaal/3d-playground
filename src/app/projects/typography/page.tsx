'use client'

import { useEffect, useState, useReducer } from 'react'
import { Canvas } from '@react-three/fiber'
import { load } from 'opentype.js'
import { mapValues } from 'lodash'
import { useConfig, makeSeparator, makeButton } from '@/app/hooks/useConfig'
import { Box } from '@/app/components/Box'
import { Scene } from './Scene'
import { convertFont, getFontOptions } from './helpers/fonts'
import randomColor from 'randomcolor'

const Page = () => {
  const [fonts, setFonts] = useState<{ [key: string]: string } | null>(null)
  const [fontVariants, setFontVariants] = useState<any>(null)
  const [fontData, setFontData] = useState<any>(null)
  const [color, refreshColor] = useReducer(() => randomColor(), randomColor())

  const fontFamilies = mapValues(fonts, (value, key) => key)

  useEffect(() => {
    (async () => { setFonts(await getFontOptions()) })()
  }, [])

  const { settings, reset } = useConfig({
    characters: { type: 'text', value: 'Paula' },
    ...makeSeparator(),
    ...(fontFamilies && {
      fontFamily: { value: 'Archivo', options: fontFamilies }
    }),
    ...(fontVariants && {
      fontVariant: { value: fontVariants['500'], options: fontVariants }
    }),
    color: { value: color },
    bgColor: { value: '#1c1c1c' },
    amount: { value: 5, min: 5, max: 100, step: 1 },
    size: { value: 40, min: 5, max: 100, step: 1 },
    depth: { value: 5, min: 0, max: 50, step: 1 },
    offset: { value: 30, min: 0, max: 100, step: 1 },
    posY: { value: 0, min: -50, max: 50, step: 1 },
    ...makeSeparator(),
    bevelSize: { value: 25, min: 0, max: 100, step: 1 },
    bevelThickness: { value: 50, min: 0, max: 100, step: 1 },
    bevelSegments: { value: 5, min: 1, max: 25, step: 1 },
    curveSegments: { value: 25, min: 1, max: 25, step: 1 },
    ...makeSeparator(),
    objectRotation: {
      label: 'object ⟳',
      value: 5,
      min: -100,
      max: 100,
      step: 1
    },
    zoom: { value: 25, min: 1, max: 500, step: 5 },
    ...makeSeparator(),
    lights: { value: true },
    wireframe: { value: true },
    ...makeSeparator(),
    ...makeButton('reset', () => {
      reset()
      refreshColor()
    })
  })

  const getFontData = async (fontVariant: string) => {
    const font = await load(fontVariant)
    setFontData(convertFont(font))
  }

  useEffect(() => {
    if (!fonts) return
    if (!settings.fontFamily) return

    setFontVariants(fonts[settings.fontFamily])
  }, [fonts, settings?.fontFamily])

  useEffect(() => {
    if (!settings.fontVariant) return

    getFontData(settings.fontVariant)
  }, [settings?.fontVariant])

  return (
    <Box
      css={{
        width: '100%',
        div: { mih: '100vh' },
        backgroundColor: settings?.bgColor
      }}
    >
      <Canvas shadows>
        <Scene settings={settings} fontData={fontData} />
      </Canvas>
    </Box>
  )
}

export default Page
