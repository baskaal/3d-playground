import { useEffect, useRef, useState } from 'react'
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

export const useConfig = (config: any, projectIndex?: number) => {
  const pane = useRef<Pane | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const path = usePathname().split('/')
  const storageId = `project-${projectIndex || path[path.length - 1]}-settings`
  const [settings, setSettings, removeSettings] = useLocalStorage<any>(storageId, null)

  useEffect(() => {
    if (pane.current) {
      pane.current.dispose()
      pane.current = null
    }

    const debouncedSetValues = debounce((event: any) => {
      setIsExpanded(true)
      setSettings((currentSettings) => ({
        ...getSettings(config),
        ...currentSettings,
        [event.target.key || event.target.label]: event.value
      }))
    }, 500)

    pane.current = new Pane()
    pane.current.on('change', debouncedSetValues)

    const folder = pane.current.addFolder({ title: 'settings', expanded: isExpanded })
    folder.on('fold', ({ expanded }) => setIsExpanded(expanded))

    Object.entries(config).forEach(([key, item]) => {
      add(folder, { ...item, key, value: settings?.[key] ?? item.value }, settings)
    })
  }, [config])

  return {
    settings: settings || getSettings(config),
    reset: removeSettings
  }
}
