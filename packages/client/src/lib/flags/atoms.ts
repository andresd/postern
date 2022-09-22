import { atom } from 'recoil'
import { FeatureFlag } from './types'

export const flagsState = atom<FeatureFlag[] | null>({
  key: 'flags',
  default: null
})
