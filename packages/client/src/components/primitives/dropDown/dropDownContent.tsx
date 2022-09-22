import { useStyles } from '@components/hooks'
import { HTMLAttributes } from 'react'
import { DropDownItem } from './dropDownItem'
import { styles } from './styles'
import { OptionItem } from './types'

type DropDownContentProps = {
  data: (string | OptionItem)[]
  renderRow?: (item: OptionItem | string) => any
  onChange?: (value: any) => void
  category?: 'primary' | 'secondary'
} & HTMLAttributes<HTMLDivElement>

export const DropDownContent = (props: DropDownContentProps) => {
  const { data = [], renderRow, onChange, category = 'primary' } = props

  const style = useStyles(styles)

  return (
    <div className={style[category].dropDownContent}>
      {data.map((item: any, index: number) => {
        return (
          <DropDownItem item={item} key={`dropdown_${index}`} renderRow={renderRow} onChange={onChange} />
        )
      })}
    </div>
  )
}
