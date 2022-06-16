import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import { App } from './client/main/main'
import { getRecoil, setRecoil } from 'recoil-nexus'
import { isTerminalPausedState, terminalLogState } from '@lib/server/atoms'
import { chalky, getEndpoints, methodColor, terminal, TerminalLog } from '@postern/core'

const updateTerminalLogs = (log: TerminalLog) => {
  const isTerminalPaused = getRecoil(isTerminalPausedState)
  if (isTerminalPaused) {
    return
  }
  const prevLogs = getRecoil(terminalLogState)
  const logs = [...prevLogs, log]
  setRecoil(terminalLogState, logs)
}

const initializeIpcCallbacks = () => {
  terminal.setOutputMethod((log) => updateTerminalLogs(log))

  try {
    // @ts-ignore
    window.client.writeToTerminal((_event: IpcRendererEvent, log: TerminalLog) => updateTerminalLogs(log))
  } catch (e) {
    console.error('initializeIpcCallbacks', e)
  }
}

initializeIpcCallbacks()

const container = document.getElementById('root') as Element
const root = createRoot(container)
root.render(<App />)
