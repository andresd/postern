import React, { HTMLAttributes, LegacyRef, useEffect, useMemo, useRef, useState } from 'react'
import { TerminalLog } from '@postern/core'
import { styles } from './styles'
import { isTerminalPausedState, terminalLogState } from '@lib/server/atoms'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import Ansi from 'ansi-to-react'
import dayjs from 'dayjs'

import LocalizedFormat from 'dayjs/plugin/localizedFormat'

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
        console.log('BLOCK', block)
        return <Ansi key={blockIndex}>{block}</Ansi>
      })}
    </div>
  )
}

export const TerminalView = (props: TerminalViewProps) => {
  const { ...rest } = props

  const terminalLogs = useRecoilValue(terminalLogState)
  const resetTerminalLog = useResetRecoilState(terminalLogState)
  const [isTerminalPaused, setIsTerminalPaused] = useRecoilState(isTerminalPausedState)

  const lastRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lastRowRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [terminalLogs, lastRowRef.current])

  const handleClearTerminal = () => {
    resetTerminalLog()
  }

  console.log('terminalLogs', terminalLogs)

  return (
    <div {...rest}>
      <div className={styles.container}>
        <div className={styles.topContainer}>
          {'Terminal'}
          <div className={styles.buttonsContainer}>
            <button onClick={() => setIsTerminalPaused(!isTerminalPaused)} className={styles.buttons}>{isTerminalPaused ? 'Activate' : 'Pause'}</button>
            <button onClick={handleClearTerminal} className={styles.buttons}>Clear</button>
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
