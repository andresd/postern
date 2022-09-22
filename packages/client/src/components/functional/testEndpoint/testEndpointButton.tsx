import { Button } from '@components/primitives'
import { Icon } from '@components/primitives/icons'
import { terminal } from '@postern/core'
import { endpointListState, selectedEndpointIndexState, serverPortState } from '@state/server/atoms'
import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'

export const TestEndpointButton = () => {
  const endpoints = useRecoilValue(endpointListState)
  const selectedEndpointIndex = useRecoilValue(selectedEndpointIndexState)
  const port = useRecoilValue(serverPortState)

  const endpoint = useMemo(() => (endpoints) ? endpoints?.[selectedEndpointIndex] : null, [endpoints, selectedEndpointIndex])

  const handleTestEndPoint = async () => {
    try {
      const response = await fetch(`http://localhost:${port}/api/${endpoint?.path}`, { method: endpoint?.method })
      const text = await response.text()
      try {
        const json = JSON.parse(text)
        terminal.info(JSON.stringify(json, null, 0))
      } catch {
        terminal.info(text)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button onClick={handleTestEndPoint}><Icon name={'debug-rerun'} /></Button>
  )
}
