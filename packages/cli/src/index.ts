import { startServer } from '@postern/engine'
import process from 'process'
import fs from 'fs'
import { MockServer } from '@postern/core'
import yargs from 'yargs'

const argv = yargs(process.argv.slice(2))
  .scriptName('postern')
  .usage('$0 -f [config file] -p [port]')
  .help(false)
  .options({
    f: { type: 'string', alias: 'file', describe: 'Path to configuration yaml file' },
    p: { type: 'number', alias: 'port', describe: 'Port of Postern server', default: 3004 }
  })
  .version()
  .parseSync()

const run = () => {
  const yamlFilePath = argv.f
  const mockServer = new MockServer()
  if (yamlFilePath) {
    try {
      const data = fs.readFileSync(yamlFilePath, 'utf-8')
      data && mockServer.importFromYaml(data)
    } catch (e) {
      console.error(e)
    }
  }
  mockServer.port = argv.p
  startServer(mockServer)
}

run()
