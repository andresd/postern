import { EndPoint, EntityWithId, MockServer, Response } from './types'
import YAML from 'yaml'

// eslint-disable-next-line prefer-const
let endpointsStorage: EndPoint[] = []
let serverPort: number | undefined = undefined
let forwardProxy: string | undefined = undefined

export const getServerPort = () => serverPort
export const setServerPort = (port: number) => { serverPort = port }

export const getForwardProxy = () => forwardProxy
export const setForwardingProxy = (proxy: string | undefined) => { forwardProxy = proxy }


const getNewId = (items: EntityWithId[]) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return items.length > 0 ? Math.max(...items.map(item => item.id!)) + 1 : 1
}

export const setEndpoints = (endpoints: EndPoint[]) => {
  if (endpoints) {
    endpointsStorage.length = 0
    endpointsStorage.push(...endpoints)
  } else {
    endpointsStorage.length = 0
  }
}

export const loadFromStorage = () => {
  const storedEndpoint = []// store.get('endpoints') as EndPoint[]
  if (storedEndpoint) {
    endpointsStorage.push(...storedEndpoint)
  }
}

export const saveInStorage = () => {
  // store.set('endpoints', endpointsStorage)
}

export const getEndpoints = (): EndPoint[] => {
  return endpointsStorage
}

export const addEndpoint = (endpoint: EndPoint, endpoints: EndPoint[] = endpointsStorage): EndPoint => {
  const newEndpoint = {
    ...endpoint,
    id: getNewId(endpoints),
    responses: undefined
  }
  endpoints.push(newEndpoint)
  endpoint.responses?.forEach(response => addResponse(newEndpoint, response))
  return newEndpoint
}

export const addResponse = (endpoint: EndPoint, response: Response): Response => {
  const newResponse = {
    ...response, id: getNewId(endpoint.responses ?? [])
  }
  if (!endpoint.responses) {
    endpoint.responses = []
  }
  endpoint.responses.push(newResponse)
  return newResponse
}

export const getEndpointResponses = (endpointId: number): Response[] => {
  return endpointsStorage[endpointId].responses ?? []
}

export const deleteEndpoint = (endpointId: number): EndPoint => {
  return endpointsStorage.splice(endpointId, 1)[0]
}

export const setEndpoint = (endpoint: EndPoint): EndPoint => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  endpointsStorage[endpoint.id!] = endpoint
  return endpoint
}

export const importFromYaml = (yaml: string, storage: EndPoint[] = endpointsStorage): MockServer => {
  const mockServer = YAML.parse(yaml) as MockServer
  endpointsStorage = []
  mockServer.endpoints.forEach((endpoint) => {
    addEndpoint(endpoint, endpointsStorage)
  })
  return { endpoints: endpointsStorage, port: mockServer.port, forwardProxy: mockServer.forwardProxy }
}

export const exportToYaml = (endpoints: EndPoint[] = endpointsStorage, port?: number, proxy?: string) => {
  const mockServer: MockServer = { endpoints: endpoints, port: serverPort ?? port, forwardProxy: forwardProxy ?? proxy }
  return YAML.stringify(mockServer)
}

export const createEmptyResponse = (endpoint: EndPoint): Response => {
  return {
    endpointId: endpoint.id,
    id: getNewId(endpoint.responses ?? []),
    statusCode: 200,
    isActive: true,
    template: 'Successful'
  }
}

export const createEmptyEndpoint = (endpoints: EndPoint[]): EndPoint => {
  const newEndpoint = {
    id: getNewId(endpoints),
    name: 'Empty endpoint',
    path: 'user/:id',
    method: 'GET',
    responses: undefined,
    redirectEnabled: false
  } as EndPoint
  const newResponse = createEmptyResponse(newEndpoint)
  newEndpoint.responses = [newResponse]
  return newEndpoint
}
