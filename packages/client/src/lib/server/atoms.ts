import { atom, selector } from 'recoil'

export const serverPortState = atom<number>({
  key: 'serverPort',
  default: selector<number>({
    key: 'serverPort/default',
    get: () => {
      const port = window.localStorage.getItem('serverPort')
      const portValue = parseInt(port ?? '3004', 10)
      // @ts-ignore
      window.server.setPort(portValue)
      return portValue
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (port) => {
        // @ts-ignore
        await window.server.setPort(port)
        window.localStorage.setItem('serverPort', port.toString())
      })
    }
  ]
})

export const redirectBaseUrlState = atom<string | null>({
  key: 'redirectBaseUrl',
  default: selector<string | null>({
    key: 'redirectBaseUrl/default',
    get: () => {
      const url = window.localStorage.getItem('redirectBaseUrl')
      // @ts-ignore
      window.server.setRedirectBaseUrl(url)
      return url
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (url) => {
        // @ts-ignore
        await window.server.setRedirectBaseUrl(url)
        window.localStorage.setItem('redirectBaseUrl', url ?? '')
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
