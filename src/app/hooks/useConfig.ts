import { useEffect, useRef } from 'react'
import { FolderApi, Pane } from 'tweakpane'
import { debounce, mapValues, pickBy, uniqueId } from 'lodash'
import { usePathname } from 'next/navigation'
import { useLocalStorage } from 'usehooks-ts'

export const makeButton = (title: string, onClick: Function): any => {
  return { [`button-${uniqueId()}`]: { type: 'button', title, onClick } }
}

export const makeSeparator = (): any => {
  return { [`seperator-${uniqueId()}`]: { type: 'separator' } }
}

const add = (pane: FolderApi, item: any, values: any) => {
  const { key, value, ...options } = item

  if (item.type === 'button') {
    return pane.addButton({ title: item.title }).on('click', item.onClick)
  }

  if (item.type === 'separator') {
    return pane.addBlade({ view: 'separator' })
  }

  return pane.addBinding({ [key]: value }, key, options)
}

const getSettings = (config: any) => {
  return mapValues(pickBy(config, 'value'), 'value')
}

export const useConfig = (config: any) => {
  const pane = useRef<Pane | null>(null)
  const path = usePathname().replace(/^.*\//, '')
  const storageId = `project-${path}-settings`
  const [settings, setSettings, removeSettings] = useLocalStorage<any>(storageId, null)

  useEffect(() => {
    destroy()

    const debouncedSetValues = debounce((event: any) => {
      setSettings((currentSettings) => ({
        ...getSettings(config),
        ...currentSettings,
        [event.target.key || event.target.label]: event.value
      }))
    }, 500)

    pane.current = new Pane()
    pane.current.on('change', debouncedSetValues)

    const folder = pane.current.addFolder({ title: 'settings', expanded: true })

    Object.entries(config).forEach(([key, item]) => {
      add(folder, { ...item, key, value: settings?.[key] ?? item.value }, settings)
    })
  }, [config])

  const destroy = () => {
    if (pane.current) {
      pane.current.dispose()
      pane.current = null
    }
  }

  return {
    settings: settings || getSettings(config),
    reset: removeSettings,
    destroy
  }
}
