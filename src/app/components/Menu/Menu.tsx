// @ts-nocheck

import { Select, Input, Checkbox, Spacer } from '3oilerplate'
import { Settings as SettingsIcon } from 'react-feather'
import { SMenu, SMenuCredits, SMenuItem, SMenuToggle } from '@/app/components/Menu/Menu.styled'

export const MenuToggle = ({ setMenuOpen, menuOpen }: any) => (
  <SMenuToggle onClick={() => setMenuOpen(!menuOpen)}>
    <SettingsIcon size={16} />
  </SMenuToggle>
)

export const Menu = ({ setConfig, config, credits }: any) => (
  <SMenu>
    <SMenuItem>
      <span>Color</span>
      <Select
        s={{ Select: { padding: 'xs' }, width: '100px' }}
        value={config.color}
        onChange={(value: string) => setConfig({ ...config, color: value }) }
        options={[
          { label: 'Crystal', value: '#A69FB8' },
          { label: 'Red', value: '#FF0303' },
          { label: 'Green', value: '#499B2B' },
          { label: 'Gold', value: '#FFE15D' }
        ]}
      />
    </SMenuItem>
    <SMenuItem>
      <span>Shape Amount</span>
      <Input
        s={{ color: 'white', padding: 'xs', width: '100px' }}
        type="number"
        defaultValue={config.amount}
        onChange={(value: any) => setConfig({ ...config, amount: Number(value) }) }
      />
    </SMenuItem>
    <SMenuItem>
      <span>Shape Offset</span>
      <Input
        s={{ color: 'white', padding: 'xs', width: '100px' }}
        type="number"
        defaultValue={config.offset}
        onChange={(value: any) => setConfig({ ...config, offset: Number(value) }) }
      />
    </SMenuItem>
    <SMenuItem>
      <span>Zoom</span>
      <Input
        s={{ color: 'white', padding: 'xs', width: '100px' }}
        type="number"
        defaultValue={config.zoom}
        onChange={(value: any) => setConfig({ ...config, zoom: Number(value) }) }
      />
    </SMenuItem>
    <SMenuItem>
      <span>Rotate Object</span>
      <Spacer s={{ width: 'auto', flexDirection: 'row' }}>
        <Checkbox
          checked={config.rotateObject}
          onChange={(value: boolean) => setConfig({ ...config, rotateObject: value }) }
        />
        <Input
          s={{ color: 'white', padding: 'xs', width: '100px' }}
          type="number"
          step={0.1}
          isDisabled={!config.rotateObject}
          defaultValue={config.objectRotationSpeed}
          onChange={(value: any) => setConfig({ ...config, objectRotationSpeed: Number(value) }) }
        />
      </Spacer>
    </SMenuItem>
    <SMenuItem>
      <span>Rotate Scene</span>
      <Spacer s={{ width: 'auto', flexDirection: 'row' }}>
        <Checkbox
          checked={config.rotateScene}
          onChange={(value: boolean) => setConfig({ ...config, rotateScene: value }) }
        />
        <Input
          s={{ color: 'white', padding: 'xs', width: '100px' }}
          type="number"
          step={1}
          isDisabled={!config.rotateScene}
          defaultValue={config.sceneRotationSpeed}
          onChange={(value: any) => setConfig({ ...config, sceneRotationSpeed: Number(value) }) }
        />
      </Spacer>
    </SMenuItem>
    <SMenuItem>
      <span>Edges</span>
      <Checkbox
        checked={config.edges}
        onChange={(value: boolean) => setConfig({ ...config, edges: value }) }
      />
    </SMenuItem>
    <SMenuItem>
      <span>Lights</span>
      <Checkbox
        checked={config.lights}
        onChange={(value: boolean) => setConfig({ ...config, lights: value }) }
      />
    </SMenuItem>
    <SMenuItem>
      <span>Wireframe</span>
      <Checkbox
        checked={config.wireframe}
        onChange={(value: boolean) => setConfig({ ...config, wireframe: value }) }
      />
    </SMenuItem>

    <SMenuCredits>{ credits }</SMenuCredits>
  </SMenu>
)
