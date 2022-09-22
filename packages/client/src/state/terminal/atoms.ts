import { atom, selector } from 'recoil'

export const isTerminalPausedState = atom<boolean>({
  key: 'terminal',
  default: false
})

export const terminalLogState = atom<any[]>({
  key: 'terminalLog',
  default: []
})
