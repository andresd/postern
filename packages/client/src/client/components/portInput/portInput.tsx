import { serverPortState } from '@lib/server/atoms'
import React, { HTMLAttributes } from 'react'
import { useRecoilState } from 'recoil'
import { styles } from './styles'

type PortInputProps = HTMLAttributes<HTMLDivElement>

export const PortInput = (props: PortInputProps) => {
  const { ...rest } = props
  const [port, setPort] = useRecoilState(serverPortState)

  return (
    <div className={styles.container}>
      <span>{'Port: '}</span>
      <input className={styles.input} type='number' value={port} onChange={event => setPort(+event.target.value)} />
    </div>
  )
}
