import React, { HTMLAttributes, useState } from 'react'
import { OptionItem } from './types'
import { styles } from './styles'

export interface IDropDownItemProps {
  item: string | OptionItem
  renderRow?: (item: OptionItem | string) => any,
  onChange?: (value: any) => void,
  backgroundColor?: string,
  color?: string
}

export type DropDownItemProps = IDropDownItemProps & HTMLAttributes<HTMLDivElement>

export const DropDownItem = (props: DropDownItemProps) => {
  const { item, renderRow, onChange } = props
  const [isOver, setIsOver] = useState(false)

  return (

    <div
      className={isOver ? styles.dropdownItemHighlight : styles.dropdownItem}
      onClick={() => onChange?.((item as OptionItem)?.value ?? item)}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
      style={{ backgroundColor: props.backgroundColor, color: props.color }}
    >
      {renderRow ? renderRow(item) : (item as OptionItem)?.label ?? item}
    </div>
  )
}
