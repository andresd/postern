import { ipcMain, IpcMainInvokeEvent } from 'electron'
import { setPort, setRedirectBaseUrl, reStartServer } from '@postern/engine'
import { setEndpoints, EndPoint } from '@postern/core'

ipcMain.handle('setEndpoints', (_event: IpcMainInvokeEvent, endpoints: EndPoint[]) => {
  setEndpoints(endpoints)
})

ipcMain.handle('restart', () => {
  reStartServer()
})

ipcMain.handle('setPort', (_event: IpcMainInvokeEvent, portValue: number) => {
  setPort(portValue)
  reStartServer()
})

ipcMain.handle('setRedirectBaseUrl', (_event: IpcMainInvokeEvent, redirectBaseUrl: string) => {
  setRedirectBaseUrl(redirectBaseUrl)
  reStartServer()
})

// export { startServer, reStartServer } from './engine1'
export { setMainWindow } from './globals'
