import { PropsWithChildren, ReactNode } from 'react'
import { getRecoil } from 'recoil-nexus'
import { flagsState } from './atoms'
import { FeatureFlags } from './flagsProvider'
import { FeatureFlag } from './types'

export const findMatchingFlags = (authorizedFlags: string[], exactFlags?: boolean, allFlags?: FeatureFlag[] | null): FeatureFlag[] => {
  const flags = allFlags ?? getRecoil(flagsState)

  const matchingFlags = (flags: FeatureFlag[]) => {
    return flags.filter((flag) => {
      return flag.isActive && authorizedFlags.includes(flag.name)
    })
  }

  if (!flags) {
    return []
  }

  const matching = matchingFlags(flags)
  if (exactFlags) {
    return matching.length === authorizedFlags.length
      ? matching
      : []
  } else {
    return matching.length
      ? matching
      : []
  }
}

export type FlagsProps = {
  authorizedFlags: string[]
  exactFlags?: boolean
  renderOn?: (matchingFlags: FeatureFlag[]) => ReactNode
  renderOff?: () => ReactNode
}

export const Flags = (props: PropsWithChildren<FlagsProps>) => {
  const { authorizedFlags, children, exactFlags = false, renderOn = () => null, renderOff = () => null } = props

  const resolveRender = (matchingFlags: FeatureFlag[]) => {
    return children ?? renderOn(matchingFlags)
  }

  return (
    <FeatureFlags.Consumer>
      {(flags) => {
        const matchingFlags = findMatchingFlags(authorizedFlags, exactFlags, flags)
        if (matchingFlags.length) {
          return resolveRender(matchingFlags)
        } else {
          return renderOff()
        }
      }}
    </FeatureFlags.Consumer>
  )
}
