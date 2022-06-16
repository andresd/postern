import express from 'express'
import http from 'http'
import cors from 'cors'
import url from 'url'
import { match } from 'node-match-path'
import { chalky, getEndpoints, methodColor, terminal } from '@postern/core'
import { generateBody } from './templateManager'

let port = 3004

export const setPort = (portValue: number) => {
  port = portValue
}

let redirectBaseUrl: string | null = null

export const setRedirectBaseUrl = (baseUrl: string) => {
  redirectBaseUrl = baseUrl
}

const app = express()

app.use(cors())

const getPrettyJson = (json: string) => {
  try {
    const obj = JSON.parse(json)
    return JSON.stringify(obj, null, 2).replaceAll('\\n', '').replaceAll('\\"', '"')
  } catch (e) {
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
  OPTIONS: (text: string) => chalky.frColor('#fff').bgColor(methodColor.OPTIONS).toString(text),
}

app.all(/.*/, (req, res) => {
  try {
    let processed = false

    const endpoints = getEndpoints()
    endpoints
      .filter(endpoint => {
        if (endpoint.method !== req.method) {
          return false
        }

        // const url = new URL(req.url)
        // eslint-disable-next-line node/no-deprecated-api
        const pathname = url.parse(req.url).pathname
        const endpointPath = `/api/${endpoint.path[0] === '/' ? endpoint.path.substring(1) : endpoint.path}`
        const pathMatchResult = pathname ? match(endpointPath, pathname) : null
        if (!pathMatchResult?.matches) {
          return false
        }

        return true
      })
      .forEach((endpoint, index) => {
        if (index > 0) {
          return
        }

        terminal.info(colors[req.method](req.method), ' ', req.url)

        if (endpoint.redirectEnabled && endpoint.redirect) {
          //
          // Redirect
          let redirectPath = endpoint.redirect
          // eslint-disable-next-line node/no-deprecated-api
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
          //
          // Without Redirect
          const response = endpoint.responses?.find(response => response.isActive)

          if (response?.headers) {
            res.set(response.headers)
          }
          const body = generateBody(response)

          terminal.info(`Response: ${getPrettyJson(body)} `)

          res.status(response?.statusCode ?? 200).send(body)
        }
        processed = true
      })

    if (!processed) {
      if (redirectBaseUrl) {

        const redirectTo = redirectBaseUrl.replace(/\/+$/, '') + req.originalUrl
        console.log('REDIRECTo', redirectTo)
        terminal.info(colors.redirect('ENDPOINT NOT FOUND, REDIRECTING TO: '), colors[req.method](req.method), ' ', redirectTo)
        res.redirect(307, redirectTo)
      } else {
        terminal.info(colors.notFound('ENDPOINT NOT FOUND - '), colors[req.method](req.method), ' ', req.url)
        res.status(404).send('fail!')
      }
    }
  } catch (e: any) {
    console.error(e)
    terminal.info(colors.error('Postern ERROR: '), e.message as string)

    res.status(500).send(e.message)
  }
})

let server: http.Server

export const startServer = () => {
  server = app.listen(port, () => {
    const message = `Server listening on port ${port} `
    terminal.info(message)
  })
}

export const reStartServer = () => {
  server.close(() => {
    startServer()
  })
}
