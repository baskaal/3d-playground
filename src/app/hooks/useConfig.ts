import { useEffect, useRef, useState } from 'react'
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

const add = (pane: FolderApi, item: any, values: any) => {
  const { key, value, dependsOn, ...options } = item

  if (item.type === 'button') {
    return pane.addButton({ title: item.title }).on('click', item.onClick)
  }

  if (item.type === 'separator') {
    return pane.addBlade({ view: 'separator' })
  }

  if (dependsOn && !values[dependsOn]) {
    return
  }

  return pane.addBinding({ [key]: value }, key, options)
}

const getValues = (config: any) => {
  return mapValues(pickBy(config, 'value'), 'value')
}

export const useConfig = (initConfig: any, projectIndex?: number) => {
  const pane = useRef<Pane | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const path = usePathname().split('/')
  const storageId = `project-${projectIndex || path[path.length - 1]}-config`
  const [values, setValues] = useLocalStorage<any>(storageId, {})

  useEffect(() => {
    if (isEmpty(values)) {
      return setValues(getValues(initConfig))
    }

    if (pane.current) {
      pane.current.dispose()
      pane.current = null
    }

    const debouncedSetValues = debounce((event: any) => {
      setIsExpanded(true)
      setValues((currentConfig) => ({
        ...currentConfig,
        [event.target.key || event.target.label]: event.value
      }))
    }, 500)

    pane.current = new Pane()
    pane.current.on('change', debouncedSetValues)

    const folder = pane.current.addFolder({ title: 'config', expanded: isExpanded })

    Object.entries(initConfig).forEach(([key, item]) => {
      add(
        folder,
        { ...item, key, value: values[key] !== undefined ? values[key] : item.value },
        values
      )
    })
  }, [initConfig, values])

  return {
    config: values,
    reset: () => setValues(getValues(initConfig))
  }
}
