import { useStyles } from '@components/hooks'
import { css, cx } from '@emotion/css'
import { ButtonHTMLAttributes, useMemo, useState } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { Icon, IconNames } from '../icons'
import { styles } from './styles'

type ButtonProps = {
  loading?: boolean
  icon?: IconNames
  size?: 'tiny' | 'small' | 'medium' | 'large'
  category?: 'primary' | 'secondary' | 'tertiary'
  styleType?: 'default' | 'destructive'
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  const { icon, className, category = 'primary', styleType = 'default', size = 'medium', loading, disabled, children, ...rest } = props

  const style = useStyles(styles, { size })

  const [isHover, setIsHover] = useState(false)

  const currentStyle = useMemo(() => {
    return style[styleType][category]
  }, [category, styleType, style])

  const [currentStyleState, textColor] = useMemo(() => {
    const state = disabled ? 'disabled' : loading ? 'loading' : isHover ? 'hover' : 'default'
    return [cx(css({ ...currentStyle.base, ...currentStyle[state] }), className), currentStyle[state].color]
  }, [currentStyle, isHover, disabled, loading])

  if (loading && !disabled) {
    return (
      <button className={currentStyleState} {...rest}>
        <BeatLoader color={currentStyle.spinnerColor} size={'9px'} />
      </button>)
  }

  return (
    <button className={currentStyleState} {...rest} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className={style.content}>
        {icon && <Icon name={icon} size={16} color={textColor} />}
        {children}
      </div>
    </button>
  )
}
