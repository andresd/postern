import { EndPoint } from '@postern/core'
import { contextBridge, ipcRenderer, IpcRendererEvent, Session } from 'electron'

contextBridge.exposeInMainWorld('server', {
  setEndpoints: (endpoints: EndPoint[]) => ipcRenderer.invoke('setEndpoints', endpoints),
  setSessions: (sessions: Session[]) => ipcRenderer.invoke('setSessions', sessions),
  restart: () => ipcRenderer.invoke('restart'),
  setServerPort: async (port: number) => ipcRenderer.invoke('setServerPort', port),
  setForwardingProxy: async (forwardingProxy: string) => ipcRenderer.invoke('setForwardingProxy', forwardingProxy)
})

contextBridge.exposeInMainWorld('client', {
  saveAs: (content: string) => ipcRenderer.invoke('saveAs', content),
  writeToTerminal: (callback: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('writeToTerminal', callback)
})
