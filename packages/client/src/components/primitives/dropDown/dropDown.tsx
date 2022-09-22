import { cx } from '@emotion/css'
import { Popover, Transition } from '@headlessui/react'
import { Fragment, HTMLAttributes } from 'react'
import { useStyles } from '@components/hooks'
import { Icon } from '../icons'
import { DropDownContent } from './dropDownContent'
import { styles } from './styles'
import { OptionItem } from './types'

export type { OptionItem }

type DropDownProps = {
  label?: string
  data: (string | OptionItem)[]
  renderSelected?: (item: any) => any,
  renderRow?: (item: OptionItem | string) => any,
  value: any,
  placeHolder?: string,
  onChange?: (value: any) => void,
  category?: 'primary' | 'secondary'
} & HTMLAttributes<HTMLDivElement>

const defaultRenderSelected = (value: any, data: (string | OptionItem)[]) => {
  const result = data.find(item => (item as OptionItem)?.value ? (item as OptionItem).value === value : item === value)
  return (result as OptionItem)?.label ?? result
}

export const DropDown = (props: DropDownProps) => {
  const { label, data, className, renderRow, renderSelected = defaultRenderSelected, value, placeHolder, onChange, category = 'primary', ...rest } = props

  const style = useStyles(styles)

  const handleSelectionChange = (value: any, close: () => void) => {
    onChange?.(value)
    close()
  }

  return (
    <div className={cx(style.label, className)} {...rest}>
      {label && <span className={style.labelText}>{label}</span>}
      <Popover className={style[category].popover}>
        {({ open, close }) => (
          <>
            <Popover.Button id='header' className={cx(style[category].dropdownHeader)}>
              <div id='label' className={style[category].dropdownHeaderLabel}>
                {renderSelected?.(value, data) ?? value ?? placeHolder}
              </div>
              <div id='chevron' className={style[category].dropdownHeaderButton}>
                <Icon name={open ? 'chevron-up' : 'chevron-down'} color={style[category].chevronColor} />
              </div>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter={style.transitionEnter}
              enterFrom={style.transitionEnterFrom}
              enterTo={style.transitionEnterTo}
              leave={style.transitionLeave}
              leaveFrom={style.transitionLeaveFrom}
              leaveTo={style.transitionLeaveTo}
            >
              <Popover.Panel id='popPanel' className={style[category].popupPanel}>
                <DropDownContent
                  data={data}
                  renderRow={renderRow}
                  onChange={(value) => handleSelectionChange(value, close)}
                />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
