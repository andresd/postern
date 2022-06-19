import { deleteEndpoint, EndPoint, Session } from '@postern/core'
import { atom, selector, CallbackInterface } from 'recoil'

export const sessionListState = atom<Session[]>({
  key: 'sessionListState',
  default: selector<Session[]>({
    key: 'sessionList/default',
    get: () => {
      const sessionsJson = window.localStorage.getItem('sessions')
      const sessions = JSON.parse(sessionsJson ?? '[]')
      // @ts-ignore
      window.server.setSessions(sessions)
      return sessions
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (sessions) => {
        // @ts-ignore
        await window.server.setSessions(sessions)
        window.localStorage.setItem('sessions', JSON.stringify(sessions))
        // await ipcRenderer.invoke('setEndpoints', endpoints)
      })
    }
  ]
})

export const selectedSessionIdState = atom<number>({
  key: 'selectedSessionIdState',
  default: 0
})

export const endpointListState = atom<EndPoint[]>({
  key: 'endpointList',
  default: selector<EndPoint[]>({
    key: 'endpointList/default',
    get: ({ get }) => {
      const sessionId = get(selectedSessionIdState)
      const endpointsJson = window.localStorage.getItem(`endpoints_${sessionId}`)
      const endpoints = JSON.parse(endpointsJson ?? '[]')
      // @ts-ignore
      window.server.setEndpoints(endpoints)
      return endpoints
    }
  }),
  effects: [
    ({ onSet, getPromise }) => {
      onSet(async (endpoints) => {
        const sessionId = await getPromise(selectedSessionIdState)
        // @ts-ignore
        await window.server.setEndpoints(endpoints)
        window.localStorage.setItem(`endpoints_${sessionId}`, JSON.stringify(endpoints))
        // await ipcRenderer.invoke('setEndpoints', endpoints)
      })
    }
  ]
})

export const selectedEndpointIndexState = atom<number>({
  key: 'selectedEndpointIndex',
  default: 0
})

export const selectedEndpointNameState = atom<string>({
  key: 'selectedEndpointName',
  default: ''
})

export const deleteEndpointCallback = ({ set, reset, snapshot }: CallbackInterface) => (endpoint: EndPoint) => {
  if (!endpoint.id) {
    return
  }
  deleteEndpoint(endpoint.id)
  reset(selectedEndpointIndexState)
  reset(endpointListState)
}

export const upsertEndpointCallback = ({ set, reset, snapshot }: CallbackInterface) => (endpoint: EndPoint) => {
  if (!endpoint.id) {
    return
  }

  deleteEndpoint(endpoint.id)
  reset(selectedEndpointIndexState)
  reset(endpointListState)
}
