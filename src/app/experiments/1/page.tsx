"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Stack } from "react-bootstrap";
import { s, Select, Input, Checkbox } from '3oilerplate'
import { times } from "lodash";
import { CustomShape } from "./Shape";
import { Settings } from "react-feather";

const Index = ({ config }: any) => {
  const wrapperMeshRef = useRef<any>()
  const { camera } = useThree();

  useFrame(() => {
    if (!config.rotateObject) return;

    wrapperMeshRef.current.rotation.x += 0.5;
  })

  const getRotation = (amount: number, index: number) => {
    return ((360 / amount) * index) * (Math.PI / 180);
  }

  return (
    <>
      <ambientLight />

      { config.lights && (
        <directionalLight castShadow position={[0, 800, 0]} shadow-mapSize={[800, 800]}>
          <orthographicCamera args={[-10, 10, 10, -10]} />
        </directionalLight>
      )}

      <mesh ref={wrapperMeshRef}>
        { times(config.amount, (i) => (
          <CustomShape config={config} rotation={getRotation(config.amount, i)} />
        ))}
      </mesh>

      <OrbitControls
        camera={camera}
        minDistance={config.distance}
        maxDistance={config.distance}
        autoRotate={config.rotateScene}
        enableZoom={false}
        enablePan={false}
        target={[0, 0, 0]}
        minPolarAngle={1.5}
        maxPolarAngle={1.5}
      />
    </>
  )
}

export const SMenuToggle = s.div(() => ({
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  top: 0,
  right: 0,
  height: '2rem',
  width: '2rem',
  cursor: 'pointer',
  fontSize: '.5rem',
  margin: '1rem',
  backgroundColor: 'rgba(0, 0, 0, .8)',
  borderRadius: '.25rem',
}));

export const SMenu = s.div(() => ({
  position: 'fixed',
  top: '3rem',
  right: 0,
  padding: '1rem',
  margin: '1rem',
  backgroundColor: 'rgba(0, 0, 0, .8)',
  borderRadius: '.25rem',
}));

const Wrapper = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [config, setConfig] = useState({
    color: 'red',
    amount: 12,
    offset: 15,
    distance: 100,
    rotateObject: true,
    rotateScene: true,
    edges: true,
    lights: true,
    wireframe: false,
  });

  return (
    <>
      <Canvas>
        <Index config={config} />
      </Canvas>

      <SMenuToggle onClick={() => setMenuOpen(!menuOpen)}>
        <Settings size={16} />
      </SMenuToggle>

      { menuOpen && (
        <SMenu>
          <Stack gap={3}>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Color</span>
              <Select
                s={{ width: '100px' }}
                onChange={(value: string) => setConfig({ ...config, color: value }) }
                options={[
                  { label: 'Red', value: 'red' },
                  { label: 'Gold', value: 'gold' },
                  { label: 'White', value: 'white' },
                  { label: 'Grey', value: 'grey' },
                ]}
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Shape Amount</span>
              <Input
                s={{ width: '80px !important' }}
                type="number"
                defaultValue={config.amount}
                onChange={(value: any) => setConfig({ ...config, amount: Number(value) }) }
                style={{ width: '60px', background: 'transparent', color: 'white' }}
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Shape Offset</span>
              <Input
                s={{ width: '80px !important' }}
                type="number"
                defaultValue={config.offset}
                onChange={(value: any) => setConfig({ ...config, offset: Number(value) }) }
                style={{ width: '60px', background: 'transparent', color: 'white' }}
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Distance</span>
              <Input
                s={{ width: '80px !important' }}
                type="number"
                defaultValue={config.distance}
                onChange={(value: any) => setConfig({ ...config, distance: Number(value) }) }
                style={{ width: '60px', background: 'transparent', color: 'white' }}
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Rotate Object</span>
              <Checkbox
                className="checkbox-xl"
                isChecked={config.rotateObject}
                onChange={(value: boolean) => setConfig({ ...config, rotateObject: value }) }
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Rotate Scene</span>
              <Checkbox
                className="checkbox-xl"
                isChecked={config.rotateScene}
                onChange={(value: boolean) => setConfig({ ...config, rotateScene: value }) }
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Edges</span>
              <Checkbox
                className="checkbox-xl"
                isChecked={config.edges}
                onChange={(value: boolean) => setConfig({ ...config, edges: value }) }
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Lights</span>
              <Checkbox
                className="checkbox-xl"
                isChecked={config.lights}
                onChange={(value: boolean) => setConfig({ ...config, lights: value }) }
              />
            </Stack>
            <Stack gap={4} direction="horizontal" className="d-flex align-items-center justify-content-between">
              <span>Wireframe</span>
              <Checkbox
                className="checkbox-xl"
                isChecked={config.wireframe}
                onChange={(value: boolean) => setConfig({ ...config, wireframe: value }) }
              />
            </Stack>
          </Stack>
        </SMenu>
      ) }
    </>
  )
}

export default Wrapper;
