import { redirectBaseUrlState } from '@lib/server/atoms'
import React, { HTMLAttributes } from 'react'
import { useRecoilState } from 'recoil'
import { styles } from './styles'

type RedirectBaseUrlInputProps = HTMLAttributes<HTMLDivElement>

export const RedirectBaseUrlInput = (props: RedirectBaseUrlInputProps) => {
  const { ...rest } = props
  const [url, setUrl] = useRecoilState(redirectBaseUrlState)

  return (
    <div className={styles.container}>
      <span>{'Base Redirect Url: '}</span>
      <input className={styles.input} type='url' value={url ?? ''} onChange={event => setUrl(event.target.value)} />
    </div>
  )
}
