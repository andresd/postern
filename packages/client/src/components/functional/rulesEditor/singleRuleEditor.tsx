import { useStyles } from '@components/hooks'
import { Checkbox, DropDown, Input } from '@components/primitives'
import { Rule } from '@postern/cli/dist/core'
import { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { styles } from './styles'

type SingleRuleEditorProps = {
  index: number
  rule: Rule
  onChange: (index: number, rule: Rule) => void
}

const availableTypes = [
  { label: 'Body', value: 'body' },
  { label: 'Query String', value: 'querystring' },
  { label: 'Header', value: 'header' },
  { label: 'Route Param', value: 'param' }
]

const availableOperators = [
  { label: 'Equals', value: 'equals' },
  { label: 'Not', value: 'not' },
  { label: 'Contains', value: 'contains' },
  { label: 'RegEx', value: 'regex' },
  { label: 'NULL', value: 'null' },
  { label: 'Empty', value: 'empty' },
  { label: 'Any', value: 'any' }
]

export const SingleRuleEditor = (props: SingleRuleEditorProps) => {
  const { index, rule, onChange } = props

  const style = useStyles(styles)

  const [enabled, setEnabled] = useState(rule.enabled)
  const [type, setType] = useState(rule.type)
  const [path, setPath] = useState(rule.path)
  const [operator, setOperator] = useState(rule.operator)
  const [value, setValue] = useState(rule.value)

  useEffect(() => {
    setEnabled(rule.enabled)
    setType(rule.type)
    setPath(rule.path)
    setOperator(rule.operator)
    setValue(rule.value)
  }, [rule])

  useDebounce(
    () => {
      onChange(index, { enabled, type, path, operator, value } as Rule)
    },
    500,
    [enabled, type, path, operator, value]
  )

  return (
    <>
      <Checkbox checked={enabled} onChange={e => setEnabled(e.target.checked)} />
      <DropDown className={style.row.selectors} data={availableTypes} value={type} onChange={(value) => setType(value)} />
      <Input value={path} placeholder={'Path'} onChange={e => setPath(e.target.value)} />
      <DropDown className={style.row.selectors} data={availableOperators} value={operator} onChange={(value) => setOperator(value)} />
      <Input value={value} placeholder={'Value'} onChange={e => setValue(e.target.value)} />
    </>
  )
}
