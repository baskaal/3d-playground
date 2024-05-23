'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Menu, MenuToggle } from '@/app/components'
import { Scene } from './Scene'

const Page = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [config, setConfig] = useState({
    color: 'red',
    amount: 15,
    offset: 50,
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
      <Canvas>
        <Scene config={config} />
      </Canvas>

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
