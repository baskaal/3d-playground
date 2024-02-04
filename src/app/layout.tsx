"use client";

import { FC, PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { s, ThemeProvider, GlobalStyle, theme as DEFAULT_THEME } from '3oilerplate'
import { THEME } from '@/style/theme';

import 'reset-css/reset.css'


const NonSSRWrapper: FC<PropsWithChildren> = ({ children }) => (
  <>{children}</>
)

const DynamicWrapper = dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false
})

export const SApp = s.div(() => ({
  fontFamily: 'base',
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  color: 'color'
}))

export default function RootLayout({ children }: { children: React.ReactNode}) {
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
