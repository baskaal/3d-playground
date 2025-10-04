'use client'

import { comp } from 'csscomp'

export const Button = comp.button<{ color?: string }>(({ color = '#B5B5B5' }) => ({
  py: 2,
  px: 4,
  bgc: 'transparent',
  c: color,
  bd: 'main',
  bdc: color,
  bdrs: 4,
  cursor: 'pointer',
  trns: 'all .4s ease',

  '&:hover': {
    bgc: color,
    c: 'black'
  }
}))
