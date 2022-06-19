import { HTMLAttributes, RefObject, useCallback, useEffect, useState } from 'react'
import { styles } from './styles'

export type ContextMenuItem =
  | { isSeparator: false, id?: string, label: string, isDisabled?: boolean, onClick: () => void }
  | { isSeparator: true }

type ContextMenuProps = {
  parentRef?: RefObject<HTMLDivElement>
  items: ContextMenuItem[]
} & HTMLAttributes<HTMLDivElement>

export const ContextMenu = (props: ContextMenuProps) => {
  const { items, parentRef, ...rest } = props

  const [xPos, setXPos] = useState('0px')
  const [yPos, setYPos] = useState('0px')
  const [showMenu, setShowMenu] = useState(false)

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false)
  }, [showMenu])

  const handleContextMenu = useCallback((e) => {
    e.preventDefault()
    setXPos(`${e.pageX}px`)
    setYPos(`${e.pageY}px`)
    setShowMenu(true)
  }, [setXPos, setYPos])

  useEffect(() => {
    const parent = parentRef?.current ?? document
    document.addEventListener('click', handleClick)
    parent.addEventListener('contextmenu', handleContextMenu)
    return () => {
      document.removeEventListener('click', handleClick)
      parent.removeEventListener('contextmenu', handleClick)
    }
  })

  if (!showMenu) {
    return null
  }

  return (
    <div id='contextMenu' className={styles.contextMenu} style={{ top: yPos, left: xPos }}>
      {items.map((item, index) => {
        if (item.isSeparator) {
          return <div key={index} className={styles.separator} />
        }
        if (item.isDisabled) {
          return <div key={index} className={styles.disabled}>{item.label}</div>
        }
        return <div key={index} className={styles.option} onClick={item.onClick}>{item.label}</div>
      })}
    </div >
  )
}
