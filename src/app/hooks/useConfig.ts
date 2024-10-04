import { useEffect } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { FolderApi, Pane } from 'tweakpane'
import { uniqueId } from 'lodash'

type Setting = {
  type?: 'folder' | 'button' | 'separator'
  title?: string
  label?: string
  value?: number | string | boolean
  min?: number
  max?: number
  step?: number
  expanded?: boolean
  settings?: { [key: string]: Setting }
  onClick?: Function
}

type Settings = {
  [key: string]: Setting
}

type Config = {
  [key: string]: { value: number | string | boolean }
}

let instance: Pane | null = null

const getConfigValues = (settings: Settings): Config => {
  return Object.entries(settings).reduce((acc, [key, value]) => {
    return value.type === 'folder' ? getConfigValues(value.settings!) : { ...acc, [key]: value.value }
  }, {})
}

export const makeFolder = (title: string, settings: Settings, expanded = false): Settings => {
  return { [title]: { type: 'folder', title, settings, expanded } }
}

export const makeButton = (title: string, onClick: Function): Settings => {
  return { [`button-${uniqueId()}`]: { type: 'button', title, onClick } }
}

export const makeSeparator = (): Settings => {
  return { [`seperator-${uniqueId()}`]: { type: 'separator' } }
}

const setup = (currentPane: Pane | FolderApi, settings: Settings, config: Config) => {
  Object.entries(settings).map(([key, item]) => {
    if (item.type === 'folder') {
      const folder = currentPane.addFolder({ title: key, expanded: item.expanded })
      return setup(folder, item.settings!, config)
    }

    if (item.type === 'button') {
      return currentPane.addButton({ title: item.title! }).on('click', item.onClick as any)
    }

    if (item.type === 'separator') {
      return currentPane.addBlade({ view: 'separator' })
    }

    if (!config[key]) {
      config[key] = getConfigValues(settings)[key]
    }

    return currentPane.addBinding(config, key, { ...item })
  })
}

export const useConfig = (settings: Settings) => {
  const initialConfig = getConfigValues(settings)
  const [config, setConfig] = useLocalStorage<Config>('config', { ...initialConfig })

  const init = (newConfig: Config) => {
    if (instance) (instance as any).containerElem_.remove()
    instance = new Pane()
    instance.on('change', (event) => {
      setConfig((currentConfigValues) => ({
        ...currentConfigValues,
        [(event.target as any).key]: event.value
      }))
    })

    setup(instance, settings, newConfig)
  }

  const reset = () => {
    setConfig({ ...initialConfig })
    init({ ...initialConfig })
  }

  useEffect(() => {
    init(config)
  }, [])

  return {
    config,
    reset
  }
}
