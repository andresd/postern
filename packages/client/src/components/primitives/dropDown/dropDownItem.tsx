import { useStyles } from '@components/hooks'
import { HTMLAttributes, useState } from 'react'
import { styles } from './styles'
import { OptionItem } from './types'

type DropDownItemProps = {
  item: string | OptionItem
  renderRow?: (item: OptionItem | string) => any
  onChange?: (value: any) => void
  category?: 'primary' | 'secondary'
} & HTMLAttributes<HTMLDivElement>

export const DropDownItem = (props: DropDownItemProps) => {
  const { item, renderRow, onChange, category = 'primary' } = props
  const [isOver, setIsOver] = useState(false)

  const style = useStyles(styles)

  return (

    <div
      className={isOver ? style[category].dropdownItemHighlight : style[category].dropdownItem}
      onClick={() => onChange?.((item as OptionItem)?.value ?? item)}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      {renderRow ? renderRow(item) : (item as OptionItem)?.label ?? item}
    </div>
  )
}
