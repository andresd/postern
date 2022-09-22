import { useStyles } from '@components/hooks'
import { cx } from '@emotion/css'
import { ChangeEventHandler, CSSProperties, FocusEventHandler, forwardRef, Fragment, InputHTMLAttributes, useEffect, useState } from 'react'
import { Icon, IconNames } from '../icons'
import { styles } from './styles'

export type InputProps = {
  containerClassName?: string
  containerStyle?: CSSProperties
  value?: string | number | readonly string[]
  label?: string
  prefixIcon?: IconNames
  onPrefixIconClick?: () => void
  suffixIcon?: IconNames
  onSuffixIconClick?: () => void
  error?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { onChange, onFocus, onBlur, onPrefixIconClick, onSuffixIconClick, label, value, containerClassName, containerStyle, prefixIcon, suffixIcon, error, disabled, ...rest } = props

  const allStyles = useStyles(styles)
  const style = allStyles[disabled ? 'readOnly' : error ? 'error' : 'default']

  const [isHover, setIsHover] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(value ?? '')

  useEffect(() => {
    setInputValue(value ?? '')
  }, [value])

  const handleOnFocus = (e: any) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleOnBlur = (e: any) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value)
    onChange?.(e)
  }

  const handlePrefixIconClick = () => {
    !disabled && onPrefixIconClick?.()
  }

  const handleSuffixIconClick = () => {
    !disabled && onSuffixIconClick?.()
  }

  const handleMouseEnter = () => {
    setIsHover(true)
  }

  const handleMouseLeave = () => {
    setIsHover(false)
  }

  return (
    <div className={allStyles.container}>
      {label && <div className={allStyles.label}>{label}</div>}
      <div
        className={cx(style.container, isFocused ? style.focus : isHover ? style.hover : undefined, containerClassName)}
        style={containerStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {prefixIcon && <Icon name={prefixIcon} color={style.prefixIcon} onClick={handlePrefixIconClick} />}
        <input ref={ref} className={style.input} disabled={disabled} {...rest} onFocus={handleOnFocus} onBlur={handleOnBlur} onChange={handleOnChange} value={inputValue} />
        {suffixIcon && <Icon name={suffixIcon} color={style.suffixIcon} onClick={handleSuffixIconClick} />}
      </div>
      {error && <div className={allStyles.errorRow}>
        <Icon name='warning' color={allStyles.errorIcon} width={12} height={12} />
        <span>{error}</span>
      </div>}
    </div>
  )
})

Input.displayName = 'Input'
