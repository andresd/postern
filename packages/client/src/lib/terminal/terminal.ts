import { BrowserWindow } from 'electron'
import { TerminalLog } from '@postern/core'

export const writeBlocksToTerminal = (mainWindow: BrowserWindow | null, log: TerminalLog) => {
  mainWindow?.webContents.send('writeToTerminal', log)
}
