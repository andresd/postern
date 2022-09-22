import { useStyles } from '@components/hooks'
import { useRef, useState } from 'react'
import { styles } from './styles'

type TooltipProps = {
  children: React.ReactNode
  content?: React.ReactNode
  delay?: number
  trigger?: 'hover' | 'click' | 'all'
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = (props: TooltipProps) => {
  const { children, content, delay = 400, trigger = 'hover', placement = 'top' } = props
  const timeout = useRef<NodeJS.Timeout>()
  const [active, setActive] = useState(false)

  const style = useStyles(styles)

  const showTip = () => {
    timeout.current = setTimeout(() => {
      setActive(true)
    }, delay)
  }

  const hideTip = () => {
    clearInterval(timeout.current)
    setActive(false)
  }

  const handleOnMouseEnter = () => {
    if (!(trigger === 'hover' || trigger === 'all')) {
      return
    }
    showTip()
  }

  const handleOnClick = () => {
    if (!(trigger === 'click' || trigger === 'all')) {
      return
    }
    showTip()
  }

  return (
    <div
      className={style.wrapper}
      // When to show the tooltip
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={hideTip}
      onClick={handleOnClick}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div className={style.tip(placement)}>
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  )
}
