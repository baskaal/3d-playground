'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Settings } from 'react-feather'
import { Select, Input, Checkbox, Spacer } from '3oilerplate'
import { Menu, MenuCredits, MenuItem, MenuToggle } from '@/app/components/Menu'
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
    objectRotationSpeed: 0.01,
    rotateScene: true,
    sceneRotationSpeed: 1,
    zoom: 75
  })

  return (
    <>
      <Canvas>
        <Scene config={config} />
      </Canvas>

      <MenuToggle onClick={() => setMenuOpen(!menuOpen)}>
        <Settings size={16} />
      </MenuToggle>

      { menuOpen && (
        <Menu>
          <MenuItem>
            <span>Color</span>
            <Select
              s={{ Select: { padding: 'xs' }, width: '100px' }}
              value={config.color}
              onChange={(value: string) => setConfig({ ...config, color: value }) }
              options={[
                { label: 'Red', value: 'red' },
                { label: 'Green', value: 'green' },
                { label: 'Gold', value: 'gold' },
                { label: 'White', value: 'white' },
                { label: 'Grey', value: 'grey' }
              ]}
            />
          </MenuItem>
          <MenuItem>
            <span>Shape Amount</span>
            <Input
              s={{ padding: 'xs', width: '80px !important' }}
              type="number"
              defaultValue={config.amount}
              onChange={(value: any) => setConfig({ ...config, amount: Number(value) }) }
              style={{ width: '60px', color: 'white' }}
            />
          </MenuItem>
          <MenuItem>
            <span>Shape Offset</span>
            <Input
              s={{ padding: 'xs', width: '80px !important' }}
              type="number"
              defaultValue={config.offset}
              onChange={(value: any) => setConfig({ ...config, offset: Number(value) }) }
              style={{ width: '60px', color: 'white' }}
            />
          </MenuItem>
          <MenuItem>
            <span>Zoom</span>
            <Input
              s={{ padding: 'xs', width: '80px !important' }}
              type="number"
              defaultValue={config.zoom}
              onChange={(value: any) => setConfig({ ...config, zoom: Number(value) }) }
              style={{ width: '60px', color: 'white' }}
            />
          </MenuItem>
          <MenuItem>
            <span>Rotate Object</span>
            <Spacer s={{ width: 'auto', flexDirection: 'row' }}>
              <Checkbox
                isChecked={config.rotateObject}
                onChange={(value: boolean) => setConfig({ ...config, rotateObject: value }) }
              />
              <Input
                s={{ padding: 'xs', width: '80px !important' }}
                type="number"
                step={0.01}
                isDisabled={!config.rotateObject}
                defaultValue={config.objectRotationSpeed}
                onChange={(value: any) => setConfig({ ...config, objectRotationSpeed: Number(value) }) }
                style={{ width: '60px', color: 'white' }}
              />
            </Spacer>
          </MenuItem>
          <MenuItem>
            <span>Rotate Scene</span>
            <Spacer s={{ width: 'auto', flexDirection: 'row' }}>
              <Checkbox
                isChecked={config.rotateScene}
                onChange={(value: boolean) => setConfig({ ...config, rotateScene: value }) }
              />
              <Input
                s={{ padding: 'xs', width: '80px !important' }}
                type="number"
                step={1}
                isDisabled={!config.rotateScene}
                defaultValue={config.sceneRotationSpeed}
                onChange={(value: any) => setConfig({ ...config, sceneRotationSpeed: Number(value) }) }
                style={{ width: '60px', color: 'white' }}
              />
            </Spacer>
          </MenuItem>
          <MenuItem>
            <span>Edges</span>
            <Checkbox
              isChecked={config.edges}
              onChange={(value: boolean) => setConfig({ ...config, edges: value }) }
            />
          </MenuItem>
          <MenuItem>
            <span>Lights</span>
            <Checkbox
              isChecked={config.lights}
              onChange={(value: boolean) => setConfig({ ...config, lights: value }) }
            />
          </MenuItem>
          <MenuItem>
            <span>Wireframe</span>
            <Checkbox
              isChecked={config.wireframe}
              onChange={(value: boolean) => setConfig({ ...config, wireframe: value }) }
            />
          </MenuItem>

          <MenuCredits>Made with 🤍 on valentines day, inspired by Paula.</MenuCredits>
        </Menu>
      ) }
    </>
  )
}

export default Page
