// @ts-nocheck

'use client'

import { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { s, ThemeProvider, RootStyle, ResetStyle, darken } from '3oilerplate'
import { useConfig } from './hooks/useConfig'

const DynamicWrapper = dynamic(() => Promise.resolve(({ children }: PropsWithChildren) => <>{ children }</>), {
  ssr: false
})

const SApp = s.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  backgroundColor: 'black',
  color: 'white',
  fontFamily: 'base',
  fontSize: '16px'
})

const App = ({ children }: PropsWithChildren) => {
  const { config } = useConfig(null, 1)

  const theme = {
    colors: {
      primary: darken(config.color, 5),
      primaryDark: darken(config.color, 25)
    }
  }

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
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
