import React, { Fragment, HTMLAttributes, useMemo, useState } from 'react'
import { styles } from './styles'
import { endpointListState, selectedEndpointIndexState } from '@lib/templates/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ResponseDetails } from './responseDetails'
import { Tab } from '@headlessui/react'
import { getStatusCodeTitle } from './httpStatusCodes'
import { createEmptyResponse, EndPoint, httpMethod, HttpMethod, Response } from '@postern/core'

type EndpointDetailsProps = HTMLAttributes<HTMLDivElement>

export const EndpointDetails = (props: EndpointDetailsProps) => {
  const [endpoints, setEndpoints] = useRecoilState(endpointListState)
  const selectedEndpointIndex = useRecoilValue(selectedEndpointIndexState)

  const endpoint = useMemo(() => (endpoints) ? endpoints?.[selectedEndpointIndex] : null, [endpoints, selectedEndpointIndex])
  const [selectedResponseTab, setSelectedResponseTab] = useState(endpoint?.responses ? 0 : null)

  const onPropertyChanged = (property: string, value: any) => {
    setEndpoints(endpoints.map((endpoint, index) => {
      if (index === selectedEndpointIndex) {
        return { ...endpoint, [property]: value }
      }
      return endpoint
    }))
  }

  const onResponseChanged = (responseIndex: number, value: Response) => {
    setEndpoints(endpoints.map((endpoint, index) => {
      if (index === selectedEndpointIndex) {
        let updatedResponses
        if (endpoint.responses) {
          const responses = [...endpoint.responses]
          responses[responseIndex] = value
          updatedResponses = responses
        } else {
          updatedResponses = [value]
        }
        return { ...endpoint, responses: updatedResponses } as EndPoint
      }
      return endpoint
    }))
  }

  const handleAddResponse = () => {
    setEndpoints(endpoints.map((endpoint, index) => {
      if (index === selectedEndpointIndex) {
        return { ...endpoint, responses: [...(endpoint.responses ?? []), createEmptyResponse(endpoint)] } as EndPoint
      }
      return endpoint
    }))
  }

  const handleRemoveResponse = () => {
    setEndpoints(endpoints.map((endpoint, index) => {
      if (index === selectedEndpointIndex && selectedResponseTab !== null) {
        if (endpoint.responses) {
          const responses = [...endpoint.responses.slice(0, selectedResponseTab), ...endpoint.responses.slice(selectedResponseTab + 1)]
          return { ...endpoint, responses: responses } as EndPoint
        }
        if (selectedResponseTab > 0) {
          setSelectedResponseTab(selectedResponseTab - 1)
        }
      }

      return endpoint
    }))
  }

  if (!endpoint) {
    return null
  }

  return (
    <div {...props}>
      <div className={styles.container}>
        <div className={styles.row}>
          <select className={styles.select} value={endpoint.method} onChange={(event) => onPropertyChanged('method', event.target.value as HttpMethod)}>
            {httpMethod.map((method: HttpMethod, index: number) => (
              <option key={`method_${index}`} value={method}>{method}</option>
            ))}
          </select>
          {' / '}
          <input className={styles.input} value={endpoint.path ?? ''} onChange={(event) => onPropertyChanged('path', event.target.value)} placeholder='path' />
        </div>
        <div className={styles.row}>
          <input className={styles.input} value={endpoint.name ?? ''} onChange={(event) => onPropertyChanged('name', event.target.value)} placeholder='description' />
        </div>
        <div className={styles.row}>
          <input type={'checkbox'} className={styles.checkbox} checked={endpoint.ignoreQueryParams} onChange={(event) => onPropertyChanged('ignoreQueryParams', event.target.checked)} />
          {'Ignore query params'}
        </div>
        <div className={styles.subContainer}>
          <div className={styles.title}>
            {'Redirect'}
          </div>
          <div className={styles.row}>
            <input type={'checkbox'} className={styles.checkbox} checked={endpoint.redirectEnabled} onChange={(event) => onPropertyChanged('redirectEnabled', event.target.checked)} />
            {'Enabled'}
            <input type={'checkbox'} className={styles.checkbox} checked={endpoint.reUseQueryStringInRedirect} onChange={(event) => onPropertyChanged('reUseQueryStringInRedirect', event.target.checked)} disabled={!endpoint.redirectEnabled} />
            {'Reuse query string'}
          </div>
          <div className={styles.row}>
            <input className={styles.input} value={endpoint.redirect ?? ''} onChange={(event) => onPropertyChanged('redirect', event.target.value)} placeholder='redirect' disabled={!endpoint.redirectEnabled} />
          </div>
        </div>
        <div className={styles.subContainerExpandable}>
          <Tab.Group selectedIndex={selectedResponseTab ?? 0} onChange={setSelectedResponseTab}>
            <Tab.List className={styles.tabs.listContainer}>
              <div className={styles.tabs.list}>
                {endpoint.responses?.map((response, index) => (
                  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  <Tab key={`tab_name_${index}`} as={Fragment}>
                    {({ selected }) => (
                      <button className={selected ? styles.tabs.activeItem : styles.tabs.item}>
                        {getStatusCodeTitle(response.statusCode)}
                        <div className={styles.tabs.isActive} style={{ backgroundColor: response.isActive ? '#00D796' : '#F10A5F' }}></div>
                      </button>
                    )}
                  </Tab>
                ))}
              </div>
              <div className={styles.tabs.buttonsContainer}>
                <button onClick={handleAddResponse} className={styles.tabs.buttons}>+</button>
                <button onClick={handleRemoveResponse} className={styles.tabs.buttons}>-</button>
              </div>
            </Tab.List>
            <Tab.Panels className={styles.subContainerExpandable}>
              {endpoint.responses?.map((response, index) => (
                <Tab.Panel key={`tab_panel_${index}`} className={styles.tabs.container}>
                  <ResponseDetails response={response} onResponseChange={(response) => onResponseChanged(selectedResponseTab ?? 0, response)} />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  )
}
