import { EndPoint, MockServer, MockServerData } from '@postern/cli/dist/core'
import { atom, CallbackInterface, DefaultValue, selector } from 'recoil'
import { getServerDataFromServer, updateServer } from './actions'

const getSafeJson = (json: string) => {
  try {
    return JSON.parse(json)
  } catch {
    return json
  }
}

export const autoSyncServerState = atom<boolean>({
  key: 'autoSyncServer',
  default: selector<boolean>({
    key: 'serverData/autoSyncServer',
    get: () => {
      const autoSyncJson = window.localStorage.getItem('settings_0')
      const { autoSync } = autoSyncJson ? getSafeJson(autoSyncJson) : { autoSync: false }
      return autoSync
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (autoSync) => {
        window.localStorage.setItem('settings_0', JSON.stringify({ autoSync }))
      })
    }
  ]
})

export const refreshStates = atom<number>({
  key: 'refreshStates',
  default: 0
})

export const requestRefreshCacheCallback = ({ snapshot, set }: CallbackInterface) => async () => {
  const refreshStatesLoadable = snapshot.getLoadable(refreshStates)
  const refreshState = refreshStatesLoadable.getValue()
  set(refreshStates, refreshState + 1)
}

export const serverDataState = atom<MockServerData>({
  key: 'serverData',
  default: selector<MockServerData>({
    key: 'serverData/default',
    get: ({ get }) => {
      const serverJson = window.localStorage.getItem('server_data_0')
      const serverHost = get(serverHostState)
      if (serverJson) {
        const serverData = getSafeJson(serverJson) as MockServerData
        return serverData
      }
      return getServerDataFromServer(serverHost)
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (serverData) => {
        window.localStorage.setItem('server_data_0', JSON.stringify(serverData))
      })
    }
  ]
})

export const updateServerDataFromRemoteStateCacheCallback = ({ snapshot, set }: CallbackInterface) => async () => {
  const serverHostStateLoadable = snapshot.getLoadable(serverHostState)
  const serverHost = serverHostStateLoadable.getValue()
  const serverData = await getServerDataFromServer(serverHost)
  set(serverDataState, serverData)
}

export const updateServerDataStateCacheCallback = ({ snapshot }: CallbackInterface) => async () => {
  const serverHostStateLoadable = snapshot.getLoadable(serverHostState)
  const serverHost = serverHostStateLoadable.getValue()
  const serverDataStateLoadable = snapshot.getLoadable(serverDataState)
  const serverData = serverDataStateLoadable.getValue()
  updateServer(serverHost, serverData)
}

export const endpointListState = selector<EndPoint[]>({
  key: 'endpointList',
  get: ({ get }) => {
    const serverData = get(serverDataState)
    return serverData.endpoints ?? []
  },
  set: ({ set, get }, newValue) => {
    const serverData = get(serverDataState)
    const newData = { ...serverData }
    if (!(newValue instanceof DefaultValue)) {
      newData.endpoints = newValue
    }
    set(serverDataState, newData)
  }
})

export const serverPortState = selector<number>({
  key: 'serverPort',
  get: ({ get }) => {
    const serverData = get(serverDataState)
    return serverData.port ?? 3004
  },
  set: ({ set, get }, newValue) => {
    const serverData = get(serverDataState)
    const newData = { ...serverData }
    if (!(newValue instanceof DefaultValue)) {
      newData.port = newValue
    }
    set(serverDataState, newData)
  }
})

export const serverHostState = atom<string>({
  key: 'serverHost',
  default: selector<string>({
    key: 'serverHost/default',
    get: () => {
      const serverHost = window.localStorage.getItem('server_0')
      return serverHost ?? 'http://localhost:3004'
    }
  }),
  effects: [
    ({ onSet }) => {
      onSet(async (serverHost) => {
        window.localStorage.setItem('server_0', serverHost)
      })
    }
  ]
})

export const forwardingProxyState = selector<string | null | undefined>({
  key: 'forwardingProxy',
  get: ({ get }) => {
    const serverData = get(serverDataState)
    return serverData.forwardProxy
  },
  set: ({ set, get }, newValue) => {
    const serverData = get(serverDataState)
    const newData = { ...serverData }
    if (!(newValue instanceof DefaultValue)) {
      newData.forwardProxy = newValue
    }
    set(serverDataState, newData)
  }
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
  const serverData = snapshot.getLoadable(serverDataState).getValue()
  const mockServer = new MockServer(serverData)
  mockServer.deleteEndpoint(endpoint.id)
  reset(selectedEndpointIndexState)
  set(serverDataState, mockServer.getServerData())
}

export const upsertEndpointCallback = ({ set, reset, snapshot }: CallbackInterface) => (endpoint: EndPoint) => {
  if (!endpoint.id) {
    return
  }
  const serverData = snapshot.getLoadable(serverDataState).getValue()
  const mockServer = new MockServer(serverData)
  mockServer.deleteEndpoint(endpoint.id)
  reset(selectedEndpointIndexState)
  set(serverDataState, mockServer.getServerData())
}
