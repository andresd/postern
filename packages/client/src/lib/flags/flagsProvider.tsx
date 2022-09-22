import { createContext, PropsWithChildren, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { flagsState } from './atoms'
import { FeatureFlag } from './types'

export const FeatureFlags = createContext<FeatureFlag[] | null>(null)

type FlagsProviderProps = {
  value?: FeatureFlag[]
}

export const FlagsProvider = (props: PropsWithChildren<FlagsProviderProps>) => {
  const { value = [] } = props

  const [searchParams] = useSearchParams()
  const setFlagsState = useSetRecoilState(flagsState)

  const getFlagsFromSearchParams = () => {
    if (!searchParams) {
      return []
    }

    const flagsOffParam = searchParams.get('flagsOff')
    const flagsOff = (flagsOffParam ? flagsOffParam.split(',') : []).map((flag) => ({ name: flag, isActive: false }))

    const flagsOnParam = searchParams.get('flagsOn')
    const flagsOn = (flagsOnParam ? flagsOnParam.split(',') : []).map((flag) => ({ name: flag, isActive: true }))

    return [...flagsOn, ...flagsOff]
  }

  const getFlagsFromLocalStorage = () => {
    const flagsOffStorage = localStorage.getItem('flagsOff')
    const flagsOff = (flagsOffStorage ? flagsOffStorage.split(',') : []).map((flag) => ({ name: flag, isActive: false }))

    const flagsOnStorage = localStorage.getItem('flagsOn')
    const flagsOn = (flagsOnStorage ? flagsOnStorage.split(',') : []).map((flag) => ({ name: flag, isActive: true }))

    return [...flagsOn, ...flagsOff]
  }

  const authorizedFlags = useMemo<FeatureFlag[]>(() => {
    const flagsSp = getFlagsFromSearchParams()
    const flagsLs = getFlagsFromLocalStorage()
    return [...value, ...flagsLs, ...flagsSp]
  }, [value, searchParams])

  useEffect(() => {
    setFlagsState(authorizedFlags)
  }, [authorizedFlags])

  return (
    <FeatureFlags.Provider value={authorizedFlags}>
      {props.children}
    </FeatureFlags.Provider>
  )
}
