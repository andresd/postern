import { useStyles } from '@components/hooks'
import { Button } from '@components/primitives'
import { Rule } from '@postern/core'
import { HTMLAttributes } from 'react'
import { SingleRuleEditor } from './singleRuleEditor'
import { styles } from './styles'

type RulesEditorProps = {
  rules: Rule[]
  onRulesChange: (rules: Rule[]) => void
} & HTMLAttributes<HTMLDivElement>

const EMPTY_RULE = { enabled: true, type: 'param', path: '', operator: 'equals', value: '' } as Rule

export const RulesEditor = (props: RulesEditorProps) => {
  const { rules, onRulesChange, ...rest } = props

  const style = useStyles(styles)

  const handleEdit = (index: number, rule: Rule) => {
    const updatedRules = [...rules]
    updatedRules[index] = rule
    onRulesChange(updatedRules)
  }

  const handleRemove = (index: number) => {
    onRulesChange(rules.filter((_, i) => i !== index))
  }

  const handleAdd = () => {
    onRulesChange([...rules, EMPTY_RULE])
  }

  return (
    <div id={'RULE'} {...rest}>
      <div className={style.container}>
        {rules?.map((rule, index) => (
          <div key={index} className={style.row.container}>
            <SingleRuleEditor index={index} rule={rule} onChange={handleEdit} />
            <div className={style.row.button}>
              <Button size={'tiny'} icon={'trash'} onClick={() => handleRemove(index)} />
            </div>
          </div>
        ))}
        <div className={style.row.container}>
          <Button onClick={handleAdd} size={'tiny'} icon={'add'} >Add Rule</Button>
        </div>
      </div>
    </div >
  )
}
