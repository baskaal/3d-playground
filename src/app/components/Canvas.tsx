import { ReactNode } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { comp } from 'csscomp'

const Wrapper = comp.div(({ bgColor }: { bgColor: any }) => ({
  width: '100%',
  div: { mih: '100vh' },
  backgroundColor: bgColor
}))

export const Canvas = ({ children, settings }: { children: ReactNode, settings: any }) => {
  return (
    <Wrapper bgColor={settings?.bgColor}>
      <ThreeCanvas shadows>
        {children}
      </ThreeCanvas>
    </Wrapper>
  )
}
