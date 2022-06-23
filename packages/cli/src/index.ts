import { startServer } from '@postern/engine'
import process from 'process'
import fs from 'fs'
import { MockServer } from '@postern/core'

const run = () => {
  const yamlFilePath = process.argv[2]
  const data = fs.readFileSync(yamlFilePath, 'utf-8')
  const mockServer = new MockServer()
  mockServer.importFromYaml(data)
  startServer(mockServer)
}

run()
