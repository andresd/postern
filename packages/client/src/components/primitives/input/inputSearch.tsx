import { forwardRef, useState } from 'react'
import { Input, InputProps } from './input'

type InputSearchProps = Omit<InputProps, 'prefixIcon' | 'suffixIcon'>

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>((props: InputSearchProps, ref) => {
  const { value, onChange, ...rest } = props
  const [showClear, setShowClear] = useState(false)
  const [inputValue, setInputValue] = useState(value ?? '')

  const handleClear = () => {
    setInputValue('')
  }

  const handleOnChange = (e: any) => {
    setShowClear(e.target.value.length > 0)
    setInputValue(e.target.value)
    onChange?.(e)
  }

  return <Input ref={ref} prefixIcon={'search'} suffixIcon={showClear ? 'clear' : undefined} onSuffixIconClick={handleClear} onChange={handleOnChange} value={inputValue} {...rest} />
})

InputSearch.displayName = 'InputSearch'
