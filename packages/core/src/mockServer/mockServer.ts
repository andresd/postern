import { EndPoint, EntityWithId, Response } from './types'
import YAML from 'yaml'

const getNewId = (items: EntityWithId[]) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return items.length > 0 ? Math.max(...items.map(item => item.id!)) + 1 : 1
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

export interface MockServerData {
  endpoints: EndPoint[]
  port: number
  forwardProxy: string | null
}

export class MockServer {
  private _port = 3004
  private _forwardProxy: string | null = null
  private _endpointsStorage: EndPoint[] = []

  constructor(mockServerData?: MockServerData) {
    if (!mockServerData) {
      return
    }
    this._endpointsStorage = mockServerData.endpoints
    this._port = mockServerData.port ?? 3004
    this._forwardProxy = mockServerData.forwardProxy
  }

  public getServerData = (): MockServerData => ({
    port: this._port,
    forwardProxy: this._forwardProxy,
    endpoints: this._endpointsStorage
  })

  public get port(): number {
    return this._port
  }

  public set port(port: number) {
    this._port = port
  }

  public get forwardProxy(): string | null {
    return this._forwardProxy
  }

  public set forwardProxy(proxy: string | null) {
    this._forwardProxy = proxy
  }

  public get endpoints(): EndPoint[] {
    return this._endpointsStorage
  }

  public set endpoints(endpoints: EndPoint[]) {
    this._endpointsStorage = endpoints
  }

  private addResponse = (endpoint: EndPoint, response: Response): Response => {
    const newResponse: Response = {
      ...response, id: getNewId(endpoint.responses ?? [])
    }
    if (!endpoint.responses) {
      endpoint.responses = []
    }
    endpoint.responses.push(newResponse)
    return newResponse
  }

  public addEndpoint = (endpoint: EndPoint): EndPoint => {
    const newEndpoint = {
      ...endpoint,
      id: getNewId(this._endpointsStorage),
      responses: undefined
    }
    this._endpointsStorage.push(newEndpoint)
    endpoint.responses?.forEach(response => this.addResponse(newEndpoint, response))
    return newEndpoint
  }

  public getEndpointResponses = (endpointId: number): Response[] => {
    return this._endpointsStorage[endpointId].responses ?? []
  }

  public deleteEndpoint = (endpointId: number): EndPoint => {
    return this._endpointsStorage.splice(endpointId, 1)[0]
  }

  public setEndpoint = (endpoint: EndPoint) => {
    this._endpointsStorage[endpoint.id!] = endpoint
  }

  public importFromYaml = (yaml: string) => {
    const mockServer = YAML.parse(yaml) as MockServerData
    this._endpointsStorage = []
    mockServer.endpoints.forEach((endpoint) => {
      this.addEndpoint(endpoint)
    })
    mockServer.port && (this._port = mockServer.port)
    this._forwardProxy = mockServer.forwardProxy
  }

  public exportToYaml = () => {
    const mockServer: MockServerData = { endpoints: this._endpointsStorage, port: this._port, forwardProxy: this._forwardProxy }
    return YAML.stringify(mockServer)
  }
}
