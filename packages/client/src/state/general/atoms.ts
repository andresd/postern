import { atom, atomFamily, useRecoilSnapshot } from 'recoil'
import JSON5 from 'json5'
import { Theme } from '@styles/theme'
import { getKey } from '@lib/utils'
import { useEffect } from 'react'

export const DebugObserver = () => {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('The following atoms were modified:')
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      // eslint-disable-next-line no-console
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

export const splitSizeChangedState = atom<number[]>({
  key: 'splitSizeChanged',
  default: []
})

export const clipboardState = atom<any | null>({
  key: 'clipboard',
  default: null
})

export const currentThemeState = atom<string>({
  key: 'currentTheme',
  default: 'dark'
})

const replaceReferences = (obj: object, root?: object) => {
  if (!root) {
    root = obj
  }
  const updatedObj = { ...obj }
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'string' && value.startsWith('ref#')) {
      const path = value.substring(4)
      updatedObj[key] = getKey(path, root)
    }
    if (typeof value === 'object' && value !== null) {
      updatedObj[key] = replaceReferences(value as object, root)
    }
  }
  return updatedObj
}

export const themePropertiesState = atomFamily<Theme, string>({
  key: 'themeProperties',
  default: async (theme: string) => {
    try {
      const response = await fetch(`/themes/${theme}.jsonc`)
      const jsonStr = await response.text()
      const json = JSON5.parse(jsonStr)
      const newJson = replaceReferences(json)
      return newJson
    } catch (error) {
      console.error(`Failed to fetch config /themes/${theme}`, error)
      // throw error
    }
  }
})

export const selectedResponseTabState = atomFamily<number, string>({
  key: 'selectedResponseTab',
  default: 0
})

export const selectedInnerResponseTabState = atomFamily<number, string>({
  key: 'selectedInnerResponseTab',
  default: 0
})
