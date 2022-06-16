import React, { Fragment, HTMLAttributes } from 'react'
import { DropDownContent } from './dropDownContent'
import { OptionItem } from './types'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import { styles } from './styles'
import { Popover, Transition } from '@headlessui/react'
import { cx } from '@emotion/css'

export type { OptionItem }

interface IDropDownProps {
  data: (string | OptionItem)[]
  renderSelected?: (item: any) => any,
  renderRow?: (item: OptionItem | string) => any,
  value: any,
  placeHolder?: string,
  onChange?: (value: any) => void,
  width?: string | number,
  height?: string | number,
  panelWidth?: string | number,
  panelHeight?: string | number,
  searchable?: boolean,
  searchPlaceHolder?: string,
  searchPredicate?: (search: string, item: OptionItem | string) => boolean
  backgroundColor?: string,
  color?: string
  borderColor?: string
}

export type DropDownProps = IDropDownProps & HTMLAttributes<HTMLDivElement>

const defaultRenderSelected = (value: any, data: (string | OptionItem)[]) => {
  const result = data.find(item => (item as OptionItem)?.value ? (item as OptionItem).value === value : item === value)
  return (result as OptionItem)?.label ?? result
}

export const DropDown = (props: DropDownProps) => {
  const { data, renderRow, renderSelected = defaultRenderSelected, value, placeHolder, onChange, panelHeight, panelWidth, searchable, searchPlaceHolder, searchPredicate, className } = props

  const handleSelectionChange = (value: any, close: () => void) => {
    onChange?.(value)
    close()
  }

  return (
    <Popover className={styles.popover}>
      {({ open, close }) => (
        <>
          <Popover.Button className={cx(styles.dropdownHeader, className)} style={{ backgroundColor: props.backgroundColor, color: props.color, borderColor: props.borderColor }}>
            <div className={styles.dropdownHeaderLabel} style={{ backgroundColor: props.backgroundColor, color: props.color }}>
              {renderSelected?.(value, data) ?? value ?? placeHolder}
            </div>
            <div className={styles.dropdownHeaderButton} style={{ backgroundColor: props.backgroundColor, color: props.color }}>
              {open && <BiChevronDown color={props.color} />}
              {open && <BiChevronUp color={props.color} />}
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter={styles.transitionEnter}
            enterFrom={styles.transitionEnterFrom}
            enterTo={styles.transitionEnterTo}
            leave={styles.transitionLeave}
            leaveFrom={styles.transitionLeaveFrom}
            leaveTo={styles.transitionLeaveTo}
          >
            <Popover.Panel className={styles.popupPanel} style={{ width: panelWidth, backgroundColor: props.backgroundColor, color: props.color, borderColor: props.borderColor }}>
              <DropDownContent
                data={data}
                renderRow={renderRow}
                onChange={(value) => handleSelectionChange(value, close)}
                width={panelWidth}
                height={panelHeight}
                searchable={searchable}
                searchPlaceHolder={searchPlaceHolder}
                searchPredicate={searchPredicate}
                backgroundColor={props.backgroundColor}
                color={props.color}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
