import express from 'express'
import http from 'http'
import cors from 'cors'
import url from 'url'
import { match } from 'node-match-path'
import { chalky, HttpMethod, methodColor, MockServer, terminal } from '@postern/core'
import { generateBody } from './templateManager'

const app = express()

app.use(cors())

let currentServer: MockServer
const getPrettyJson = (json: string) => {
  try {
    const obj = JSON.parse(json)
    return JSON.stringify(obj, null, 2).replaceAll('\\n', '').replaceAll('\\"', '"')
  } catch (e) {
    return json
  }
}

const getSafeJson = (json: string) => {
  try {
    return JSON.parse(json)
  } catch {
    return json
  }
}

const colors = {
  redirect: (text: string) => chalky.frColor('#FFEB3B').toString(text),
  notFound: (text: string) => chalky.bold().frColor('#F18A5F').toString(text),
  error: (text: string) => chalky.bold().frColor('#F10A5F').toString(text),
  GET: (text: string) => chalky.frColor('#fff').bgColor(methodColor.GET).toString(text),
  POST: (text: string) => chalky.frColor('#fff').bgColor(methodColor.POST).toString(text),
  PUT: (text: string) => chalky.frColor('#fff').bgColor(methodColor.PUT).toString(text),
  DELETE: (text: string) => chalky.frColor('#fff').bgColor(methodColor.DELETE).toString(text),
  PATCH: (text: string) => chalky.frColor('#fff').bgColor(methodColor.PATCH).toString(text),
  HEAD: (text: string) => chalky.frColor('#fff').bgColor(methodColor.HEAD).toString(text),
  OPTIONS: (text: string) => chalky.frColor('#fff').bgColor(methodColor.OPTIONS).toString(text)
}

app.all(/.*/, (req, res) => {
  try {
    let processed = false

    const forwardProxy = currentServer.forwardProxy

    const endpoint = currentServer.findEndpoint(req.method as HttpMethod, req.url)
    if (endpoint) {
      if (endpoint.redirectEnabled && endpoint.redirect) {
        //
        // Redirect
        let redirectPath = endpoint.redirect
        // eslint-disable-next-line n/no-deprecated-api
        const pathname = url.parse(req.url).pathname
        const endpointPath = `/ api / ${endpoint.path[0] === '/' ? endpoint.path.substring(1) : endpoint.path} `
        const pathMatchResult = pathname ? match(endpointPath, pathname) : null
        const params = pathMatchResult?.params

        params && Object.entries(params).forEach(param => {
          redirectPath = redirectPath.replace(`:${param[0]} `, param[1])
        })
        let queryString = ''
        req.query && Object.entries(req.query).forEach(param => {
          queryString += `${queryString ? '&' : '?'}${param[0]}=${param?.[1]?.toString() ?? ''} `
        })

        terminal.info(colors.redirect('REDIRECTED TO: '), colors[req.method](req.method), ' ', req.url)

        res.redirect(307, redirectPath + queryString)
      } else {
        const response = currentServer.getValidResponse(endpoint, req.url, req.headers, req.body)
        if (response) {
          terminal.info(colors[req.method](req.method), ' ', req.url)

          if (response?.headers) {
            const headers = Object.fromEntries(Object.entries(response.headers).filter(([, value]) => (value as { enabled: boolean; value: string; })?.enabled))
            res.set(headers)
          }
          const body = generateBody(response)

          terminal.info(`Response: ${getPrettyJson(body)} `)

          res.status(response?.statusCode ?? 200).send(getSafeJson(body))
        }
      }
      processed = true
    }

    if (!processed) {
      if (forwardProxy) {
        const redirectTo = forwardProxy.replace(/\/+$/, '') + req.originalUrl
        terminal.info(colors.redirect('ENDPOINT NOT FOUND, REDIRECTING TO: '), colors[req.method](req.method), ' ', redirectTo)
        res.redirect(307, redirectTo)
      } else {
        terminal.info(colors.notFound('ENDPOINT NOT FOUND - '), colors[req.method](req.method), ' ', req.url)
        res.status(404).send('fail')
      }
    }
  } catch (e: any) {
    console.error(e)
    terminal.info(colors.error('Postern ERROR: '), e.message as string)

    res.status(500).send(e.message)
  }
})

let server: http.Server

export const startServer = (mockServer: MockServer) => {
  currentServer = mockServer
  const port = currentServer.port
  server = app.listen(port, () => {
    const message = `Server listening on port ${port} `
    terminal.info(message)
  })
}

export const reStartServer = () => {
  server.close(() => {
    startServer(currentServer)
  })
}
