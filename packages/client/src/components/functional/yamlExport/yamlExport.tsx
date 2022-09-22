import { Button, Icon, Info, Row, Tooltip } from '@components/primitives'
import { MockServer } from '@postern/core'
import { endpointListState, forwardingProxyState, serverPortState } from '@state/server/atoms'
import { saveAs } from 'file-saver'
import { useRecoilValue } from 'recoil'

export const YamlExport = () => {
  const endpoints = useRecoilValue(endpointListState)
  const forwardingProxy = useRecoilValue(forwardingProxyState)
  const serverPort = useRecoilValue(serverPortState)

  const handleExport = () => {
    const mockServer = new MockServer()
    mockServer.endpoints = endpoints
    mockServer.forwardProxy = forwardingProxy ?? null
    mockServer.port = serverPort
    const yaml = mockServer.exportToYaml()
    const blob = new Blob([yaml], { type: 'text/yaml;charset=utf-8' })
    saveAs(blob, 'mock-server-data.yaml')
  }

  return (
    <Row>
      <Button onClick={handleExport}>
        {'Export'}
      </Button>
      <Info placement={'right'} tooltip={<span>{'Export server configuration'}<br />{'to a yaml file'}</span>} />
    </Row>
  )
}
