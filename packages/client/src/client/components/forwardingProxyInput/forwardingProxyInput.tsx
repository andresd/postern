import { forwardingProxyState } from '@lib/server/atoms'
import React, { HTMLAttributes } from 'react'
import { useRecoilState } from 'recoil'
import { styles } from './styles'

type RedirectBaseUrlInputProps = HTMLAttributes<HTMLDivElement>

export const ForwardingProxyInput = (props: RedirectBaseUrlInputProps) => {
  const { ...rest } = props
  const [url, setUrl] = useRecoilState(forwardingProxyState)

  return (
    <div className={styles.container}>
      <span>{'Forward Proxy Url: '}</span>
      <input className={styles.input} type='url' value={url ?? ''} onChange={event => setUrl(event.target.value)} />
    </div>
  )
}
