import { Fragment, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { endpointListState, selectedEndpointIndexState } from '@lib/templates/atoms'
import { useRecoilState } from 'recoil'
import { styles } from './styles'
import { createEmptyEndpoint, EndPoint } from '@postern/core'
import { EndPointRow } from './endpointRow'
import update from 'immutability-helper'
import { clipboardState } from '@lib/client/atoms'
import { omitByName } from '@lib/utils'
import { ContextMenu, ContextMenuItem } from '@components/contextMenu'

type EndPointListProps = HTMLAttributes<HTMLDivElement>

export const EndPointList = (props: EndPointListProps) => {
  const { ...rest } = props

  const [endpoints, setEndpoints] = useRecoilState(endpointListState)
  const [selectedEndpointIndex, setSelectedEndpointIndex] = useRecoilState(selectedEndpointIndexState)
  const [internalClipboard, setInternalClipboard] = useRecoilState(clipboardState)

  const ref = useRef<HTMLDivElement>(null)

  const isSelectedRow = (index: number) => index === selectedEndpointIndex

  const onClickRow = (index: number) => {
    setSelectedEndpointIndex(index)
  }

  const handleAddResponse = () => {
    setEndpoints([...endpoints, createEmptyEndpoint(endpoints)])
  }
  const handleRemoveResponse = () => {
    setEndpoints([...endpoints.slice(0, selectedEndpointIndex), ...endpoints.slice(selectedEndpointIndex + 1)])
  }

  const moveEndpoint = useCallback((dragIndex: number, hoverIndex: number) => {
    setEndpoints((prevEndpoints: EndPoint[]) =>
      update(prevEndpoints, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevEndpoints[dragIndex]]
        ]
      })
    )
  }, [])

  const handleContextAction = {
    copy: (endpoint: EndPoint, index: number) => {
      setInternalClipboard(endpoint)
    },
    cut: (endpoint: EndPoint, index: number) => {
      setInternalClipboard(endpoint)
      setEndpoints([...endpoints.slice(0, index), ...endpoints.slice(index + 1)])
    },
    paste: (index: number) => {
      const newEndpoint = { ...createEmptyEndpoint(endpoints), ...omitByName(internalClipboard, ['id']) }
      internalClipboard && setEndpoints([...endpoints.slice(0, index + 1), { ...newEndpoint }, ...endpoints.slice(index + 1)])
      setSelectedEndpointIndex(index + 1)
    },
    duplicate: (endpoint: EndPoint, index: number) => {
      const newEndpoint = { ...createEmptyEndpoint(endpoints), ...omitByName(endpoint, ['id']) }
      setEndpoints([...endpoints.slice(0, index + 1), { ...newEndpoint }, ...endpoints.slice(index + 1)])
      setSelectedEndpointIndex(index + 1)
    },
    delete: (index: number) => {
      setEndpoints([...endpoints.slice(0, index), ...endpoints.slice(index + 1)])
      setSelectedEndpointIndex(index > 0 ? index - 1 : index)
    }
  }

  const getContextMenuItems = (index: number): ContextMenuItem[] => {
    const endpoint = endpoints[index]
    return [
      { label: 'Copy', onClick: () => handleContextAction.copy(endpoint, index), isSeparator: false },
      { label: 'Cut', onClick: () => handleContextAction.cut(endpoint, index), isSeparator: false },
      { label: 'Paste', onClick: () => handleContextAction.paste(index), isSeparator: false },
      { label: 'Duplicate', onClick: () => handleContextAction.duplicate(endpoint, index), isSeparator: false },
      { isSeparator: true },
      { label: 'Delete', onClick: () => handleContextAction.delete(index), isSeparator: false }
    ]
  }

  return (
    <div {...rest} ref={ref}>
      <div className={styles.container}>
        <div className={styles.buttonsContainer}>
          <button onClick={handleAddResponse} className={styles.buttons}>+</button>
          <button onClick={handleRemoveResponse} className={styles.buttons}>-</button>
        </div>
        {endpoints?.map((endpoint, index) => (
          <EndPointRow
            key={`endpoint_${endpoint.id ?? 'nil'}_${endpoint.path}`}
            className={isSelectedRow(index) ? styles.selectedRow : styles.row}
            onClick={() => onClickRow(index)}
            onContextMenu={() => {
              console.log('onContextMenu', index)
              onClickRow(index)
            }}
            moveEndpoint={moveEndpoint}
            index={index}
            endpoint={endpoint}
          />
        ))}
        <ContextMenu parentRef={ref} items={getContextMenuItems(selectedEndpointIndex)} />
      </div>
    </div>
  )
}
