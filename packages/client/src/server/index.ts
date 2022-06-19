import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { reStartServer } from '@postern/engine'
import { setEndpoints, setServerPort, setForwardingProxy, EndPoint } from '@postern/core'

ipcMain.handle('setEndpoints', (_event: IpcMainInvokeEvent, endpoints: EndPoint[]) => {
  setEndpoints(endpoints)
})

ipcMain.handle('restart', () => {
  reStartServer()
})

ipcMain.handle('setServerPort', (_event: IpcMainInvokeEvent, portValue: number) => {
  setServerPort(portValue)
  reStartServer()
})

ipcMain.handle('setForwardingProxy', (_event: IpcMainInvokeEvent, forwardingProxy: string) => {
  setForwardingProxy(forwardingProxy)
  reStartServer()
})

// export { startServer, reStartServer } from './engine1'
export { setMainWindow } from './globals'
