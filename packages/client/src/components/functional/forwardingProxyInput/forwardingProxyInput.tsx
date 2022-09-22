import { useStyles } from '@components/hooks'
import { Button, Input } from '@components/primitives'
import { forwardingProxyState } from '@state/server/atoms'
import { HTMLAttributes, useState } from 'react'
import { useRecoilState } from 'recoil'
import { styles } from './styles'

type RedirectBaseUrlInputProps = HTMLAttributes<HTMLDivElement>

export const ForwardingProxyInput = (props: RedirectBaseUrlInputProps) => {
  const style = useStyles(styles)

  const [url, setUrl] = useRecoilState(forwardingProxyState)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={style.container} {...props}>
      <span className={style.label}>{'Forward Url'}</span>
      <Button className={style.button} category={'tertiary'} size={'tiny'} onClick={() => setIsExpanded(!isExpanded)}>{isExpanded ? '\u00AB' : '\u00BB'}</Button>
      {isExpanded && <Input containerClassName={style.input} type='url' value={url ?? ''} onChange={event => setUrl(event.target.value)} />}
    </div>
  )
}
