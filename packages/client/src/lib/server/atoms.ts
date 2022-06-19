import { atom, selector } from 'recoil'

export const serverPortState = atom<number>({
  key: 'serverPort',
  default: selector<number>({
    key: 'serverPort/default',
    get: () => {
      const port = window.localStorage.getItem('serverPort')
      const portValue = parseInt(port ?? '3004', 10)
      // @ts-ignore
      window.server.setServerPort(portValue)
      return portValue
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (port) => {
        // @ts-ignore
        await window.server.setServerPort(port)
        window.localStorage.setItem('serverPort', port.toString())
      })
    }
  ]
})

export const forwardingProxyState = atom<string | null>({
  key: 'forwardingProxy',
  default: selector<string | null>({
    key: 'forwardingProxy/default',
    get: () => {
      const url = window.localStorage.getItem('forwardingProxy')
      // @ts-ignore
      window.server.setForwardingProxy(url)
      return url
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (url) => {
        // @ts-ignore
        await window.server.setForwardingProxy(url)
        window.localStorage.setItem('forwardingProxy', url ?? '')
      })
    }
  ]
})

export const isTerminalPausedState = atom<boolean>({
  key: 'terminal',
  default: false
})

export const terminalLogState = atom<any[]>({
  key: 'terminalLog',
  default: []
})
