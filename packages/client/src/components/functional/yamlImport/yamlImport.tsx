import { Button, Info, Row } from '@components/primitives'
import { MockServer } from '@postern/core'
import { endpointListState, forwardingProxyState, serverPortState } from '@state/server/atoms'
import { useRef } from 'react'
import { useSetRecoilState } from 'recoil'

export const YamlImport = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const setEndpoints = useSetRecoilState(endpointListState)
  const setForwardingProxy = useSetRecoilState(forwardingProxyState)
  const setServerPort = useSetRecoilState(serverPortState)

  const handleChange = event => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const mockServer = new MockServer()
        const text = (ev.target?.result) as string
        mockServer.importFromYaml(text)
        setServerPort(mockServer.port ?? 3004)
        setForwardingProxy(mockServer.forwardProxy)
        setEndpoints(mockServer.endpoints)
      } catch (e) {
        console.error(e)
      }
    }
    reader.readAsText(event.target.files[0])
  }

  const handleImport = () => {
    hiddenFileInput.current?.click()
  }

  return (
    <Row>
      <input type='file' ref={hiddenFileInput} onChange={handleChange} accept='*.yml; *.yaml' style={{ display: 'none' }} />
      <Button onClick={handleImport}>{'Import'}</Button>
      <Info placement={'right'} tooltip={<span>{'Import server configuration'}<br />{'from a yaml file'}</span>} />
    </Row>
  )
}
