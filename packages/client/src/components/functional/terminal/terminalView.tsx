import { TerminalLog } from '@postern/core'
import Ansi from 'ansi-to-react'
import dayjs from 'dayjs'
import { HTMLAttributes, LegacyRef, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { styles } from './styles'

import { isTerminalPausedState, terminalLogState } from '@state/terminal/atoms'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { Button, Icon } from '@components/primitives'
import { autoSyncServerState, serverHostState } from '@state/server/atoms'
import { getTerminalLogs } from '@state/server/actions'
import { useInterval } from 'react-use'

dayjs.extend(LocalizedFormat)

type TerminalViewProps = HTMLAttributes<HTMLDivElement>

type TerminalRowProps = {
  log: TerminalLog,
  rowRef?: LegacyRef<HTMLDivElement>
}

const TerminalRow = (props: TerminalRowProps) => {
  const { log, rowRef } = props

  return (
    <div className={styles.row} ref={rowRef}>
      <b>{dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}</b>
      {' - '}
      {log.args?.map((block, blockIndex) => {
        return <Ansi key={blockIndex}>{block}</Ansi>
      })}
    </div>
  )
}

export const TerminalView = (props: TerminalViewProps) => {
  const { ...rest } = props

  // const terminalLogs = useRecoilValue(terminalLogState)
  const [terminalLogs, setTerminalLogs] = useState<any>([])
  const resetTerminalLog = useResetRecoilState(terminalLogState)
  // const [isTerminalPaused, setIsTerminalPaused] = useRecoilState(isTerminalPausedState)
  const serverHost = useRecoilValue(serverHostState)
  const autoCheckServer = useRecoilValue(autoSyncServerState)

  const lastRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastRowRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs, lastRowRef.current])

  useInterval(() => {
    if (autoCheckServer) {
      handleRefresh()
    }
  }, autoCheckServer ? 15000 : null)

  const handleClearTerminal = () => {
    setTerminalLogs([])
  }

  const handleRefresh = async () => {
    const logs = await getTerminalLogs(serverHost)
    setTerminalLogs(logs)
  }

  return (
    <div {...rest}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          {'Terminal'}
          <div className={styles.buttonsContainer}>
            <Button size={'small'} onClick={handleRefresh} disabled={autoCheckServer}><Icon name={'sync'} /></Button>
            {/* <Button size={'small'} onClick={() => setIsTerminalPaused(!isTerminalPaused)} >{isTerminalPaused ? 'Activate' : 'Pause'}</Button> */}
            <Button size={'small'} onClick={handleClearTerminal} >Clear</Button>
          </div>
        </div>
        <div className={styles.logs}>
          {terminalLogs?.map((item, index) => {
            if (terminalLogs.length === index + 1) {
              return <TerminalRow key={index} log={item} rowRef={lastRowRef} />
            } else {
              return <TerminalRow key={index} log={item} />
            }
          })}
        </div>
      </div>
    </div >
  )
}
