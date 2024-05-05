'use client'

import { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { s, ThemeProvider, GlobalStyle } from '3oilerplate'
import { THEME } from '@/style/theme'

import 'reset-css/reset.css'

const DynamicWrapper = dynamic(() => Promise.resolve(({ children }: PropsWithChildren) => <>{ children }</>), {
  ssr: false
})

export const SApp = s.div(() => ({
  fontFamily: 'base',
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  color: 'white',
  fontSize: '.8rem'
}))

const App = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={THEME}>
          <DynamicWrapper>
            <GlobalStyle />
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
