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

export type RuleOperator = 'equals' | 'contains' | 'regex' | 'null' | 'empty' | 'any'
export interface Rule extends EntityWithId {
  enabled: boolean
  type: 'body' | 'querystring' | 'header' | 'param'
  path: string
  operator: RuleOperator
  value: string
}
export interface EndPoint extends EntityWithId {
  description?: string,
  path: string,
  method: HttpMethod,
  redirectEnabled?: boolean,
  redirect?: string,
  reUseQueryStringInRedirect?: boolean,
  responses?: Response[]
}

export type HeadersType = { [key: string]: { enabled: boolean, value: string } | string }

export interface Response extends EntityWithId {
  description?: string,
  endpointId: number | null,
  isActive: boolean,
  template?: string,
  dictionary?: object,
  statusCode?: number,
  headers?: HeadersType
  rules: Rule[]
}

export type EndpointWithResponse = { endpointId: number, responseId: number } & Omit<EndPoint, 'responses' | 'id'> & Omit<Response, 'id' | 'endpointId'>
