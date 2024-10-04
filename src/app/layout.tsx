// @ts-nocheck

'use client'

import { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { s, ThemeProvider, RootStyle, ResetStyle } from '3oilerplate'
import { THEME } from '@/style/theme'

const DynamicWrapper = dynamic(() => Promise.resolve(({ children }: PropsWithChildren) => <>{ children }</>), {
  ssr: false
})

export const SApp = s.div(() => ({
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  backgroundColor: 'black',
  color: 'white',
  fontFamily: 'base',
  fontSize: '.8rem'
}))

const App = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={THEME}>
          <DynamicWrapper>
            <ResetStyle />
            <RootStyle />
            <SApp>
              { children }
            </SApp>
          </DynamicWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

export default App
