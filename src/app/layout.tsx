'use client'
import { PropsWithChildren } from 'react'
import dynamic from 'next/dynamic'
import { CSSProvider, ResetStyle } from 'csscomp'
import { Theme, LocalStyle } from '@/style'
import './fonts.css'

const DynamicWrapper = dynamic(() => Promise.resolve(({ children }: PropsWithChildren) => <>{ children }</>), { ssr: false })

const App = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      <CSSProvider theme={Theme}>
        <ResetStyle />
        <LocalStyle />
        <DynamicWrapper>
          { children }
        </DynamicWrapper>
      </CSSProvider>
    </body>
  </html>
)

export default App
