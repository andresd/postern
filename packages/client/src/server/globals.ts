import { writeBlocksToTerminal } from '@lib/terminal'
import { BrowserWindow } from 'electron'
import { TerminalLog } from '@postern/core'

export let mainWindow: BrowserWindow | null = null

export const setMainWindow = (window: BrowserWindow) => {
  mainWindow = window
}

export const writeToTerminal = (log: TerminalLog) => {
  writeBlocksToTerminal(mainWindow, log)
}
