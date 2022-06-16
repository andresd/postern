import { startServer } from '@postern/engine'
import { importFromYaml, setEndpoints } from '@postern/core'
import process from 'process'
import fs from 'fs'

const run = () => {
  const yamlFilePath = process.argv[2]
  const data = fs.readFileSync(yamlFilePath, 'utf-8')
  setEndpoints(importFromYaml(data))
  startServer()
}

run()
