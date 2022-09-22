import { useStyles } from '@components/hooks'
import { ReactNode } from 'react'
import { Icon } from '../icons'
import { Tooltip } from '../tooltip'
import { styles } from './styles'

type InfoProps = {
  tooltip?: ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
}
export const Info = (props: InfoProps) => {
  const { tooltip, placement } = props
  const style = useStyles(styles)

  return (
    <Tooltip placement={placement} content={tooltip} trigger={'click'}>
      <Icon name='info' color={style.iconColor} />
    </Tooltip>
  )
}
