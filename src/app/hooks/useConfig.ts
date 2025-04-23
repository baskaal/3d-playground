import { useEffect, useRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { FolderApi, Pane } from 'tweakpane'
import { debounce, isEmpty, mapValues, pickBy, uniqueId } from 'lodash'
import { usePathname } from 'next/navigation'

export const makeButton = (title: string, onClick: Function): any => {
  return { [`button-${uniqueId()}`]: { type: 'button', title, onClick } }
}

export const makeSeparator = (): any => {
  return { [`seperator-${uniqueId()}`]: { type: 'separator' } }
}

const add = (pane: FolderApi, item: any) => {
  const { key, value, ...options } = item

  if (item.type === 'button') {
    return pane.addButton({ title: item.title }).on('click', item.onClick)
  }

  if (item.type === 'separator') {
    return pane.addBlade({ view: 'separator' })
  }

  return pane.addBinding({ [key]: value }, key, options)
}

const getValues = (config: any) => {
  return mapValues(pickBy(config, 'value'), 'value')
}

export const useConfig = (initConfig: any, projectIndex?: number) => {
  const pane = useRef<Pane | null>(null)
  const path = usePathname().split('/')
  const storageId = `project-${projectIndex || path[path.length - 1]}-config`
  const [values, setValues] = useLocalStorage<any>(storageId, {})

  useEffect(() => {
    if (isEmpty(values)) {
      setValues(getValues(initConfig))
      return
    }

    if (pane.current) {
      pane.current.dispose()
      pane.current = null
    }

    const debouncedSetValues = debounce((event: any) => {
      setValues((currentConfig) => ({
        ...currentConfig,
        [event.target.key]: event.value
      }))
    }, 500)

    pane.current = new Pane()
    pane.current.on('change', debouncedSetValues)

    const folder = pane.current.addFolder({ title: 'config', expanded: true })

    Object.entries(initConfig).forEach(([key, item]) => {
      add(folder, { ...item, key, value: values[key] !== undefined ? values[key] : item.value })
    })
  }, [initConfig, values])

  return {
    config: values,
    reset: () => setValues(getValues(initConfig))
  }
}
