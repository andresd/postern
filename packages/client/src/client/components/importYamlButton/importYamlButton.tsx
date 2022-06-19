import React, { HTMLAttributes, useRef } from 'react'
import { endpointListState } from '@lib/templates/atoms'
import { useSetRecoilState } from 'recoil'
import { importFromYaml, saveInStorage, setForwardingProxy, setServerPort } from '@postern/core'

// const fs: any = window.require('fs')

type ImportYamlButtonProps = HTMLAttributes<HTMLButtonElement>

export const ImportYamlButton = (props: ImportYamlButtonProps) => {
  const { ...rest } = props

  const hiddenFileInput = useRef<HTMLInputElement>(null)

  const setEndpoints = useSetRecoilState(endpointListState)

  const handleChange = event => {
    event.preventDefault()
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const text = (ev.target?.result) as string
        const mockServer = importFromYaml(text)
        setServerPort(mockServer.port ?? 3004)
        setForwardingProxy(mockServer.forwardProxy)
        setEndpoints(mockServer.endpoints)
        saveInStorage()
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
    <>
      <input type='file' ref={hiddenFileInput} onChange={handleChange} accept='*.yml; *.yaml' style={{ display: 'none' }} />
      <button {...rest} onClick={handleImport}>{'Import'}</button>
    </>
  )
}
