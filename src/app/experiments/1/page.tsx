'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Settings } from 'react-feather'
import { Select, Input, Checkbox } from '3oilerplate'
import { times } from 'lodash'
import { CustomShape } from './Shape'
import { Menu, MenuCredits, MenuItem, MenuToggle } from '@/app/components/Menu'

const Index = ({ config }: any) => {
  const wrapperMeshRef = useRef<any>()
  const { camera } = useThree()

  useFrame(() => {
    if (!config.rotateObject) return

    wrapperMeshRef.current.rotation.x += 0.02
  })

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180)
  }

  return (
    <group scale={0.2}>
      <ambientLight />

      { config.lights && (
        <directionalLight castShadow position={[0, 800, 0]} shadow-mapSize={[800, 800]} intensity={5}>
          <orthographicCamera args={[-10, 10, 10, -10]} />
        </directionalLight>
      )}

      <mesh ref={wrapperMeshRef}>
        { times(config.amount, (i) => (
          <CustomShape key={`shape-${i}`} config={config} rotation={getRotation(config.amount, i)} />
        ))}
      </mesh>

      <OrbitControls
        camera={camera}
        minDistance={config.zoom}
        maxDistance={config.zoom}
        autoRotate={config.rotateScene}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
        minPolarAngle={1.5}
        maxPolarAngle={1.5}
      />
    </group>
  )
}

const Wrapper = () => {
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
    zoom: 75
  })

  return (
    <>
      <Canvas>
        <Index config={config} />
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
            <Checkbox
              isChecked={config.rotateObject}
              onChange={(value: boolean) => setConfig({ ...config, rotateObject: value }) }
            />
          </MenuItem>
          <MenuItem>
            <span>Rotate Scene</span>
            <Checkbox
              isChecked={config.rotateScene}
              onChange={(value: boolean) => setConfig({ ...config, rotateScene: value }) }
            />
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

export default Wrapper
