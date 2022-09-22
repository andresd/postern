import { useStyles } from '@components/hooks'
import { cx } from '@emotion/css'
import { HTMLAttributes } from 'react'
import { styles } from './styles'

type LabelProps = HTMLAttributes<HTMLDivElement>

export const Label = (props: LabelProps) => {
  const { children, className } = props
  const style = useStyles(styles)

  return (
    <span className={cx(style.label, className)}>
      {children}
    </span>
  )
}
