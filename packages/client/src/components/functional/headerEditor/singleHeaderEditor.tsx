import { useStyles } from '@components/hooks'
import { Checkbox, Input } from '@components/primitives'
import { Header } from '@postern/cli/dist/core'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { styles } from './styles'

type SingleHeaderEditorProps = {
  index: number
  header: Header
  onChange: (index: number, header: Header) => void
}

export const SingleHeaderEditor = (props: SingleHeaderEditorProps) => {
  const { index, header, onChange } = props

  const style = useStyles(styles)

  const [enabled, setEnabled] = useState(header.enabled)
  const [key, setKey] = useState(header.key)
  const [value, setValue] = useState(header.value)

  useEffect(() => {
    setEnabled(header.enabled)
    setKey(header.key)
    setValue(header.value)
  }, [header])

  useDebounce(
    () => {
      onChange(index, { enabled, key, value })
    },
    500,
    [enabled, key, value]
  )

  const handleEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked)
  }

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <div className={style.row.container}>
      <Checkbox checked={enabled} onChange={handleEnabledChange} />
      <Input value={key} placeholder={'Key'} onChange={handleKeyChange} />
      <Input value={value} placeholder={'Value'} onChange={handleValueChange} />
    </div>
  )
}
