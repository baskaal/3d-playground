'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Box } from '3oilerplate'
import { Menu, MenuToggle } from '@/app/components'
import { Scene } from './Scene'

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [config, setConfig] = useState({
    color: '#A69FB8',
    amount: 20,
    offset: 5,
    edges: true,
    lights: true,
    wireframe: false,
    rotateObject: true,
    rotateScene: true,
    objectRotationSpeed: 1,
    sceneRotationSpeed: 5,
    zoom: 100
  })

  return (
    <>
      <Box s={{ width: '100%', div: { mih: '100vh' } }}>
        <Canvas>
          <Scene config={config} />
        </Canvas>
      </Box>

      <MenuToggle
        setMenuOpen={setMenuOpen}
        menuOpen={menuOpen}
      />

      { menuOpen && (
        <Menu
          setConfig={setConfig}
          config={config}
          credits={'Made with 🤍 for Paula on valentines day.'}
        />
      ) }
    </>
  )
}

export default Page
