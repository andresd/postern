import React, { HTMLAttributes, useEffect, useState } from 'react'
import { DropDownItem } from './dropDownItem'
import { OptionItem } from './types'
import { styles } from './styles'
import { isEmpty } from '../../../lib/utils'

const defaultPredicate = (search: string, item: OptionItem | string) => {
  return (item as OptionItem)?.label?.toLowerCase().includes(search?.toLowerCase()) ?? false
}

export interface IDropDownContentProps {
  data: (string | OptionItem)[]
  renderRow?: (item: OptionItem | string) => any,
  onChange?: (value: any) => void,
  width?: string | number,
  height?: string | number,
  searchable?: boolean,
  searchPlaceHolder?: string,
  searchPredicate?: (search: string, item: OptionItem | string) => boolean,
  backgroundColor?: string,
  color?: string
}

export type DropDownContentProps = IDropDownContentProps & HTMLAttributes<HTMLDivElement>

export const DropDownContent = (props: DropDownContentProps) => {
  const { data = [], renderRow, onChange, width, height, searchable, searchPlaceHolder, searchPredicate = defaultPredicate } = props
  const [filteredData, setFilteredData] = useState(data)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (searchable && !isEmpty(search)) {
      const filtered = data.filter((item: string | OptionItem) => searchPredicate(search, item))
      setFilteredData(filtered)
      return
    }
    setFilteredData(data)
  }, [data, search, searchPredicate, searchable])

  const renderSearchPanel = () => {
    if (!searchable) {
      return null
    }
    return (
      <input className={styles.searchBox} placeholder={searchPlaceHolder} type='search' value={search} onChange={(event) => setSearch(event.currentTarget.value)} />
    )
  }

  return (
    <div className={styles.dropDownContent} style={{ width, height, backgroundColor: props.backgroundColor, color: props.color }}>
      {renderSearchPanel()}
      {filteredData.map((item: any, index: number) => {
        return (
          <DropDownItem item={item} key={`dropdown_${index}`} renderRow={renderRow} onChange={onChange} color={props.color} backgroundColor={props.backgroundColor} />
        )
      })}
    </div>
  )
}
