import { useStyles } from '@components/hooks'
import { Button, Checkbox, Container, Input, Label, Row } from '@components/primitives'
import { DropDown, OptionItem } from '@components/primitives/dropDown/dropDown'
import { Tab } from '@headlessui/react'
import { createEmptyResponse, EndPoint, httpMethod, HttpMethod, methodColor, Response } from '@postern/cli/dist/core'
import { selectedResponseTabState } from '@state/general/atoms'
import { endpointListState, selectedEndpointIndexState } from '@state/server/atoms'
import { Fragment, HTMLAttributes, useMemo } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { getStatusCodeTitle } from './httpStatusCodes'
import { ResponseDetails } from './responseDetails'
import { styles } from './styles'

type EndpointDetailsProps = HTMLAttributes<HTMLDivElement>

export const EndpointDetails = (props: EndpointDetailsProps) => {
  const style = useStyles(styles)

  const [endpoints, setEndpoints] = useRecoilState(endpointListState)
  const selectedEndpointIndex = useRecoilValue(selectedEndpointIndexState)

  const endpoint = useMemo(() => (endpoints) ? endpoints?.[selectedEndpointIndex] : null, [endpoints, selectedEndpointIndex])

  const [selectedResponseTab, setSelectedResponseTab] = useRecoilState(selectedResponseTabState(`${endpoint?.id}`))

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
    const updatedEndpoints = endpoints.map((endpoint, index) => {
      if (index === selectedEndpointIndex && selectedResponseTab !== null) {
        if (endpoint.responses) {
          const responses = [...endpoint.responses.slice(0, selectedResponseTab), ...endpoint.responses.slice(selectedResponseTab + 1)]
          return { ...endpoint, responses } as EndPoint
        }
        if (selectedResponseTab > 0) {
          setSelectedResponseTab(selectedResponseTab - 1)
        }
      }

      return endpoint
    })
    setEndpoints(updatedEndpoints)
  }

  if (!endpoint) {
    return (
      <div {...props}>
        <Container>
        </Container>
      </div>
    )
  }

  const renderMethod = (method: HttpMethod) => (
    <div className={style.method} style={{ backgroundColor: methodColor[method] }}>
      {method}
    </div>
  )

  return (
    <div {...props}>
      <Container className={style.main}>
        <Row>
          <div className={style.tabs.isActive} style={{ backgroundColor: endpoint.isActive ? '#00D796' : '#F10A5F' }}></div>
          <Checkbox label={'Is Active'} checked={endpoint.isActive} onChange={(event) => onPropertyChanged('isActive', event.target.checked)} />
        </Row>
        <Container>
          <Row>
            <DropDown
              className={style.select}
              data={httpMethod.map((method: HttpMethod) => ({ label: method, value: method }))}
              value={endpoint.method}
              onChange={(value) => onPropertyChanged('method', value as HttpMethod)}
              // renderSelected={(value) => renderMethod(value)}
              renderRow={(item) => renderMethod((item as OptionItem).value)}
            />
            {' / '}
            <Input value={endpoint.path ?? ''} onChange={(event) => onPropertyChanged('path', event.target.value)} placeholder='path' />
          </Row>
          <Row>
            <Input label={'Description'} value={endpoint.description ?? ''} onChange={(event) => onPropertyChanged('description', event.target.value)} placeholder='description' />
          </Row>
          <div className={style.innerContainer}>
            <Label>
              {'Redirect'}
            </Label>
            <Row>
              <Checkbox label={'Enabled'} checked={endpoint.redirectEnabled} onChange={(event) => onPropertyChanged('redirectEnabled', event.target.checked)} />
              <Checkbox label={'Reuse query string'} checked={endpoint.reUseQueryStringInRedirect} onChange={(event) => onPropertyChanged('reUseQueryStringInRedirect', event.target.checked)} disabled={!endpoint.redirectEnabled} />
            </Row>
            <Row>
              <Input label={'Redirect uri'} value={endpoint.redirect ?? ''} onChange={(event) => onPropertyChanged('redirect', event.target.value)} placeholder='Redirect uri' disabled={!endpoint.redirectEnabled} />
            </Row>
          </div>
          <div className={style.subContainerExpandable}>
            <Tab.Group selectedIndex={selectedResponseTab ?? 0} onChange={setSelectedResponseTab}>
              <Tab.List className={style.tabs.listContainer}>
                <div className={style.tabs.list}>
                  {endpoint.responses?.map((response, index) => (
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    <Tab key={`tab_name_${index}`} as={Fragment}>
                      {({ selected }) => (
                        <button className={selected ? style.tabs.activeItem : style.tabs.item}>
                          {getStatusCodeTitle(response.statusCode)}
                          <div className={style.tabs.isActive} style={{ backgroundColor: response.isActive ? '#00D796' : '#F10A5F' }}></div>
                        </button>
                      )}
                    </Tab>
                  ))}
                </div>
                <div className={style.tabs.buttonsContainer}>
                  <Button onClick={handleAddResponse}>+</Button>
                  <Button onClick={handleRemoveResponse}>-</Button>
                </div>
              </Tab.List>
              <Tab.Panels className={style.subContainerExpandable}>
                {endpoint.responses?.map((response, index) => (
                  <Tab.Panel key={`tab_panel_${index}`} className={style.tabs.container}>
                    <ResponseDetails response={response} onResponseChange={(response) => onResponseChanged(selectedResponseTab ?? 0, response)} />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </div>
        </Container>
      </Container>
    </div>
  )
}
