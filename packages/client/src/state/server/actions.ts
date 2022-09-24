import { getUrlParts } from '@lib/utils'
import { MockServerData } from '@postern/cli/dist/core'

export const defaultServerData: MockServerData = {
  endpoints: [],
  port: 3004,
  forwardProxy: null
}

export const getServerDataFromServer = async (serverHost: string) => {
  const url = `${getUrlParts(serverHost).baseUrl}/postern/config`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Origin: serverHost,
      'Access-Control-Request-Headers': 'Content-Type'
    }
  })
  const serverObj = await response.json()
  if (serverObj.serverData) {
    const serverData = serverObj.serverData as MockServerData
    return serverData
  }
  return defaultServerData
}

export const updateServer = async (serverHost: string, serverData: MockServerData) => {
  const url = `${getUrlParts(serverHost).baseUrl}/postern/restart`
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: serverHost,
      'Access-Control-Request-Headers': 'Content-Type'
    },
    body: JSON.stringify({ server: serverData })
  })
}

export const getTerminalLogs = async (serverHost: string) => {
  try {
    const url = `${getUrlParts(serverHost).baseUrl}/postern/logs`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Origin: serverHost,
        'Access-Control-Request-Headers': 'Content-Type'
      }
    })
    const json = await response.json()
    return json.logs
  } catch {
    return []
  }
}

export const isServerLive = async (serverHost: string) => {
  try {
    const url = `${getUrlParts(serverHost).baseUrl}/postern/live`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Origin: serverHost,
        'Access-Control-Request-Headers': 'Content-Type'
      }
    })
    const json = await response.json()
    return json.isLive
  } catch {
    return false
  }
}
