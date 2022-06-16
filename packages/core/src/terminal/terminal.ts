import dayjs from 'dayjs'

import LocalizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(LocalizedFormat)

export type TerminalLog = {
  level: Level
  timestamp: number,
  args: any[],
}
export type Level = 'debug' | 'info' | 'warn' | 'error' | 'log'
export type OutputMethod = (log: TerminalLog) => void


class Terminal {
  private outputMethod?: OutputMethod

  setOutputMethod(outputMethod: OutputMethod) {
    this.outputMethod = outputMethod
  }

  log(...args: any[]) {
    this.write('log', ...args)
  }

  debug(...args: any[]) {
    this.write('debug', ...args)
  }

  info(...args: any[]) {
    this.write('info', ...args)
  }

  warn(...args: any[]) {
    this.write('warn', ...args)
  }

  error(...args: any[]) {
    this.write('error', ...args)
  }

  private write(level: Level, ...args: any[]) {
    const now = Date.now()
    const timestamp = dayjs(now).format('YYYY-MM-DD HH:mm:ss')

    if (this.outputMethod) {
      const log: TerminalLog = { level, timestamp: now, args }
      this.outputMethod(log)
    }

    console[level](timestamp, ...args)
  }
}

const terminalImp = new Terminal()

export const terminal = terminalImp
export default terminalImp
