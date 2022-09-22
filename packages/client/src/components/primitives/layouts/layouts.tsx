import { useStyles } from '@components/hooks'
import { cx } from '@emotion/css'
import { HTMLAttributes } from 'react'
import { styles } from './styles'

type ContainerProps = HTMLAttributes<HTMLDivElement>

export const Container = (props: ContainerProps) => {
  const { children, className, ...rest } = props
  const style = useStyles(styles)

  return (
    <div className={cx(style.container, className)} {...rest}>
      {children}
    </div>
  )
}

type RowProps = HTMLAttributes<HTMLDivElement>

export const Row = (props: RowProps) => {
  const { children, className, ...rest } = props
  const style = useStyles(styles)

  return (
    <div className={cx(style.row, className)} {...rest}>
      {children}
    </div>
  )
}
