import { startServer } from '@postern/engine'
import { importFromYaml, setEndpoints, setForwardingProxy, setServerPort } from '@postern/core'
import process from 'process'
import fs from 'fs'

const run = () => {
  const yamlFilePath = process.argv[2]
  const data = fs.readFileSync(yamlFilePath, 'utf-8')
  const mockServer = importFromYaml(data)
  setServerPort(mockServer.port ?? 3004)
  setForwardingProxy(mockServer.forwardProxy)
  setEndpoints(mockServer.endpoints)
  startServer()
}

run()
