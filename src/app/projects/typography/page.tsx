'use client'

import { useEffect, useState, useReducer } from 'react'
import { load } from 'opentype.js'
import randomColor from 'randomcolor'
import { mapValues } from 'lodash'
import { Canvas } from '@/app/components'
import { useConfig, makeSeparator, makeButton } from '@/app/hooks/useConfig'
import { convertFont, getFontOptions } from './helpers/fonts'
import { Scene } from './Scene'

const Page = () => {
  const [fonts, setFonts] = useState<{ [key: string]: string } | null>(null)
  const [fontVariants, setFontVariants] = useState<any>(null)
  const [fontData, setFontData] = useState<any>(null)
  const [color, refreshColor] = useReducer(() => randomColor(), randomColor())

  const fontFamilies = mapValues(fonts, (value, key) => key)

  const { settings, reset, destroy } = useConfig({
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
    zoom: { value: 250, min: 1, max: 500, step: 5 },
    ...makeSeparator(),
    lights: { value: true },
    ...makeSeparator(),
    ...makeButton('reset', () => {
      reset()
      refreshColor()
    })
  })

  useEffect(() => {
    (async () => {
      const fontOptions = await getFontOptions()
      setFonts(fontOptions)
    })()

    return destroy
  }, [])

  useEffect(() => {
    if (!fonts) return
    if (!settings.fontFamily) return

    setFontVariants(fonts[settings.fontFamily])
  }, [fonts, settings?.fontFamily])

  useEffect(() => {
    if (!settings.fontVariant) return

    (async () => {
      const font = await load(settings.fontVariant)
      setFontData(convertFont(font))
    })()
  }, [settings?.fontVariant])

  return (
    <Canvas settings={settings}>
      <Scene settings={settings} fontData={fontData} />
    </Canvas>
  )
}

export default Page
