import React, { HTMLAttributes } from 'react'
import { endpointListState } from '@lib/templates/atoms'
import { useRecoilValue } from 'recoil'
import { exportToYaml } from '@postern/core'
import { forwardingProxyState, serverPortState } from '@lib/server/atoms'

type ExportYamlButtonProps = HTMLAttributes<HTMLButtonElement>

export const ExportYamlButton = (props: ExportYamlButtonProps) => {
  const { ...rest } = props

  const endpoints = useRecoilValue(endpointListState)
  const forwardingProxy = useRecoilValue(forwardingProxyState)
  const serverPort = useRecoilValue(serverPortState)

  const handleExport = async () => {
    const yaml = exportToYaml(endpoints, serverPort, forwardingProxy ?? '')
    // @ts-ignore
    await window.client.saveAs(yaml)
  }

  return (
    <button {...rest} onClick={handleExport}>{'Export'}</button>
  )
}
