import { atom } from 'recoil'

export const splitSizeChangedState = atom<number[]>({
  key: 'splitSizeChanged',
  default: []
})

export const clipboardState = atom<any | null>({
  key: 'clipboard',
  default: null
})
