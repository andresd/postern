import { match } from 'node-match-path'
import path from 'path'
import URL from 'url-parse'
import YAML from 'yaml'
import { EndPoint, EntityWithId, HttpMethod, Response } from './types'

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
    template: 'Successful',
    rules: []
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
  forwardProxy?: string | null
  prefix?: string | null
}

export class MockServer {
  private _port = 3004
  private _forwardProxy: string | null = null
  private _endpointsStorage: EndPoint[] = []
  private _prefix: string | null = ''

  constructor(mockServerData?: MockServerData) {
    if (!mockServerData) {
      return
    }
    this._endpointsStorage = mockServerData.endpoints
    this._port = mockServerData.port ?? 3004
    this._forwardProxy = mockServerData.forwardProxy ?? ''
    this._prefix = mockServerData.prefix ?? ''
  }

  public setServerData = (mockServerData?: MockServerData) => {
    if (!mockServerData) {
      return
    }
    this._endpointsStorage = mockServerData.endpoints
    this._port = mockServerData.port ?? 3004
    this._forwardProxy = mockServerData.forwardProxy ?? ''
    this._prefix = mockServerData.prefix ?? ''
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

  public get prefix(): string {
    return this._prefix ?? ''
  }

  public set prefix(prefix: string) {
    this._prefix = prefix
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
    this._forwardProxy = mockServer.forwardProxy ?? ''
  }

  public exportToYaml = () => {
    const mockServer: MockServerData = { endpoints: this._endpointsStorage, port: this._port, forwardProxy: this._forwardProxy }
    return YAML.stringify(mockServer)
  }

  private ruleCompare = (value: string | null | undefined, rule): boolean => {
    switch (rule.operator) {
      case 'any':
        return value !== undefined
      case 'equals':
        return value === rule.value
      case 'not':
        return value !== rule.value
      case 'contains':
        return (value as string)?.includes(rule.value)
      case 'regex':
        return new RegExp(rule.value).test((value as string))
      case 'null':
        return value === '' || value === null
      case 'empty': {
        const values = (value as string).split(',')
        return values.length === 0
      }
    }
    return false
  }

  private trimPath = (path: string): string => {
    return path.replace(/^\/+|\/+$/g, '')
  }

  private joinPaths = (...paths: string[]): string => {
    return '/' + paths.map(path => this.trimPath(path)).filter(path => path !== '').join('/')
  }

  public findEndpoint = (method: HttpMethod, url: string): EndPoint | null => {
    const parse = new URL(url, true)
    const endpoint = this._endpointsStorage
      .find((endpoint) => {
        if (endpoint.method !== method) {
          return undefined
        }
        // Validate paths matches
        const pathname = parse.pathname
        const endpointPath = this.joinPaths('/', this._prefix ?? '', endpoint.path)
        const pathMatches = match(endpointPath, pathname)

        if (!pathMatches.matches) {
          return undefined
        }

        return endpoint
      })
    return endpoint ?? null
  }

  public getValidResponse = (endpoint: EndPoint, url: string, headers: object, body: any): Response | null => {
    const parse = new URL(url, true)

    const response = endpoint.responses?.find(response => {
      // Validate paths matches
      const pathname = parse.pathname
      const endpointPath = this.joinPaths('/', this._prefix ?? '', endpoint.path)
      const pathMatches = match(endpointPath, pathname)

      // Validate endpoint rules
      const rulesValid = response.rules?.every(rule => {
        if (rule.type === 'header') {
          return this.ruleCompare(headers[rule.path], rule)
        }
        if (rule.type === 'querystring') {
          return this.ruleCompare(parse.query[rule.path], rule)
        }
        if (rule.type === 'body') {
          return rule.path ? this.ruleCompare(body[rule.path], rule) : this.ruleCompare(body, rule)
        }
        if (rule.type === 'param') {
          return this.ruleCompare(pathMatches.params?.[rule.path], rule)
        }
        return false
      })

      return rulesValid ? response : undefined
    })
    return response ?? null
  }
}
