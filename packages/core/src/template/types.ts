export interface EntityWithId {
  id: number | null
}

export const methodColor = {
  GET: '#00bcd4',
  POST: '#4caf50',
  PUT: '#ff9800',
  DELETE: '#f44336',
  PATCH: '#9c27b0',
  HEAD: '#673ab7',
  OPTIONS: '#2196f3'
}

export const httpMethod = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'] as const
export type HttpMethod = typeof httpMethod[number]

export interface Session extends EntityWithId {
  name: string
}

export interface EndPoint extends EntityWithId {
  name?: string,
  description?: string,
  path: string,
  method: HttpMethod,
  ignoreQueryParams?: boolean,
  redirectEnabled?: boolean,
  redirect?: string,
  reUseQueryStringInRedirect?: boolean,
  responses?: Response[]
}

export interface Response extends EntityWithId {
  id: number | null,
  endpointId: number | null,
  isActive: boolean,
  queryParamCondition?: object,
  template?: string,
  dictionary?: object,
  statusCode?: number,
  headers?: { [key: string]: string }
}

export type EndpointWithResponse = { endpointId: number, responseId: number } & Omit<EndPoint, 'responses' | 'id'> & Omit<Response, 'id' | 'endpointId'>
