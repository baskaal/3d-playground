import { useEffect, useRef } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { FolderApi, Pane } from 'tweakpane'
import { mapValues, pickBy, uniqueId } from 'lodash'
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

export const useConfig = (initConfig: any, projectIndex?: number) => {
  const pane = useRef<Pane | null>(null)
  const path = usePathname().split('/')
  const storageId = `project-${projectIndex || path[path.length - 1]}-config`
  const initialValues = mapValues(pickBy(initConfig, 'value'), 'value')
  const [values, setValues, removeValues] = useLocalStorage<any>(storageId, initialValues)

  useEffect(() => {
    if (pane.current) {
      pane.current.dispose()
      pane.current = null
    }

    pane.current = new Pane()
    pane.current.on('change', (event) => {
      setValues((currentConfig) => ({
        ...currentConfig,
        [event.target.key]: event.value
      }))
    })

    const folder = pane.current.addFolder({ title: 'config', expanded: true })

    Object.entries(initConfig).forEach(([key, item]) => {
      add(folder, { ...item, key, value: values[key] !== undefined ? values[key] : item.value })
    })
  }, [initConfig])

  return {
    config: values,
    reset: removeValues
  }
}
