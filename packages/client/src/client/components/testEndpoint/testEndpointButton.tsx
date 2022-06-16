import { serverPortState } from '@lib/server/atoms'
import { endpointListState, selectedEndpointIndexState } from '@lib/templates/atoms'
import React, { useMemo } from 'react'
import { VscDebugRerun } from 'react-icons/vsc'
import { useRecoilValue } from 'recoil'
import { terminal } from '@postern/core'

export const TestEndpointButton = (props) => {
  const endpoints = useRecoilValue(endpointListState)
  const selectedEndpointIndex = useRecoilValue(selectedEndpointIndexState)
  const port = useRecoilValue(serverPortState)

  const endpoint = useMemo(() => (endpoints) ? endpoints?.[selectedEndpointIndex] : null, [endpoints, selectedEndpointIndex])

  const handleTestEndPoint = async () => {
    console.log('test endpoint', 2)
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
      console.log(error)
    }
  }

  return (
    <button {...props} onClick={handleTestEndPoint}><VscDebugRerun /></button>
  )
}
