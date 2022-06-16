import { EndPoint } from '@postern/core'
import { contextBridge, ipcRenderer, IpcRendererEvent, Session } from 'electron'

contextBridge.exposeInMainWorld('server', {
  setEndpoints: (endpoints: EndPoint[]) => ipcRenderer.invoke('setEndpoints', endpoints),
  setSessions: (sessions: Session[]) => ipcRenderer.invoke('setSessions', sessions),
  restart: () => ipcRenderer.invoke('restart'),
  setPort: async (port: number) => ipcRenderer.invoke('setPort', port),
  setRedirectBaseUrl: async (redirectBaseUrl: string) => ipcRenderer.invoke('setRedirectBaseUrl', redirectBaseUrl)
})

contextBridge.exposeInMainWorld('client', {
  saveAs: (content: string) => ipcRenderer.invoke('saveAs', content),
  writeToTerminal: (callback: (event: IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on('writeToTerminal', callback)
})
