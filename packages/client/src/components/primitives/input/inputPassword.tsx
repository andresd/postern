import { forwardRef, useState } from 'react'
import { Input, InputProps } from './input'

type InputPasswordProps = Omit<InputProps, 'prefixIcon' | 'suffixIcon'>

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>((props: InputPasswordProps, ref) => {
  const { value, onChange, ...rest } = props

  const [inputType, setInputType] = useState<'password' | 'text'>('password')
  const [showPassword, setShowPassword] = useState(false)
  const [inputValue, setInputValue] = useState(value ?? '')

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
    setInputType(showPassword ? 'password' : 'text')
  }

  const handleOnChange = (e: any) => {
    setInputValue(e.target.value)
    onChange?.(e)
  }

  return <Input ref={ref} type={inputType} suffixIcon={showPassword ? 'eye-off' : 'eye'} onSuffixIconClick={handleShowPassword} onChange={handleOnChange} value={inputValue} {...rest} />
})

InputPassword.displayName = 'InputPassword'
