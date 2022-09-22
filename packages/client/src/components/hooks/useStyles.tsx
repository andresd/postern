import { currentThemeState, themePropertiesState } from '@state/general/atoms'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

export type Options = Record<string, any>

export type Styles<T extends object> = (themeName: Record<string, any>, options: Options) => T

export const useStyles = <T extends object>(styles: Styles<T>, options?: Options) => {
  const currentTheme = useRecoilValue(currentThemeState)
  const theme = useRecoilValue(themePropertiesState(currentTheme))

  const style = useMemo(() => styles(theme, { ...options }), [currentTheme, options])

  return style
}
