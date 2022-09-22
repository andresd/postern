import { useStyles } from '@components/hooks'
import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { styles } from './styles'

type CheckboxProps = {
  label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props: CheckboxProps, ref) => {
  const { checked, disabled, label, onChange, onFocus, onBlur, ...rest } = props

  const [isFocused, setIsFocused] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const style = useStyles(styles, { isChecked: checked, isFocused, isHover, isDisabled: disabled })

  const handleOnFocus = (e: any) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleOnBlur = (e: any) => {
    setIsFocused(false)
    onBlur?.(e)
  }

  const handleOnChange = (e: any) => {
    onChange?.(e)
  }

  return (
    <label className={style.label}>
      <div
        className={style.container}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <input
          ref={ref}
          type='checkbox'
          className={style.input}
          checked={checked}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          disabled={disabled}
          onChange={handleOnChange}
          {...rest}
        />
      </div>
      <span className={style.labelText}>{label}</span>
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
