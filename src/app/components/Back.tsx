'use client'

import { comp } from 'csscomp'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from 'react-feather'

export const BackButton = comp.button<{ color?: string }>(({ color = '#B5B5B5' }) => ({
  height: '24px',
  width: '24px',
  margin: '10px',
  bgc: 'transparent',
  d: 'flex',
  ai: 'center',
  jc: 'center',
  pos: 'absolute',
  c: color,
  bd: 'main',
  bdc: color,
  bdrs: '50%',
  cursor: 'pointer',
  trns: 'all .4s ease',
  zIndex: 1000,

  '&:hover': {
    bgc: color,
    c: 'black'
  }
}))

export const Back = () => {
  const path = usePathname()
  const router = useRouter()

  if (path === '/') return null

  return (
    <BackButton onClick={() => router.back()}>
      <ArrowLeft size={14} />
    </BackButton>
  )
}
