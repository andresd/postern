import { HTMLAttributes, useRef } from 'react'
import { styles } from './styles'
import { EndPoint, methodColor } from '@postern/core'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'

interface DragItem {
  index: number
  id: string
  type: string,
  endpoint: EndPoint
}

type EndPointRowProps = {
  index: number
  endpoint: EndPoint
  moveEndpoint: (dragIndex: number, hoverIndex: number) => void
} & HTMLAttributes<HTMLDivElement>

export const EndPointRow = (props: EndPointRowProps) => {
  const { endpoint, index, className, onClick, onContextMenu, moveEndpoint } = props
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'ENDPOINT',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveEndpoint(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'ENDPOINT',
    item: () => {
      return { id: endpoint.id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div ref={ref} className={className} style={{ opacity }} onClick={(event) => onClick?.(event)} onContextMenu={(event) => onContextMenu?.(event)} data-handler-id={handlerId}>
      <div className={styles.method} style={{ backgroundColor: methodColor[endpoint.method] }}>
        {endpoint.method}
      </div>
      <div className={styles.path}>
        {endpoint.path}
      </div>
    </div>
  )
}
