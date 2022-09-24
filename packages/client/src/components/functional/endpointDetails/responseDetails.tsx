import { TemplateEditor } from '@components/functional/templateEditor/templateEditor'
import { useStyles } from '@components/hooks'
import { Checkbox, Container, Input, Row } from '@components/primitives'
import { DropDown } from '@components/primitives/dropDown/dropDown'
import { Tab } from '@headlessui/react'
import { Response } from '@postern/cli/dist/core'
import { selectedInnerResponseTabState } from '@state/general/atoms'
import { Fragment, HTMLAttributes } from 'react'
import { useRecoilState } from 'recoil'
import { HeadersEditor } from '../headerEditor'
import { RulesEditor } from '../rulesEditor'
import { httpStatusCodes } from './httpStatusCodes'
import { styles } from './styles'

type ResponseDetailsProps = {
  response: Response
  onResponseChange: (response: Response) => void
} & HTMLAttributes<HTMLDivElement>

const availableTabs = ['Response Body', 'Headers', 'Rules']

export const ResponseDetails = (props: ResponseDetailsProps) => {
  const { response, onResponseChange } = props

  const style = useStyles(styles)

  const [selectedTab, setSelectedTab] = useRecoilState(selectedInnerResponseTabState(`${response.endpointId}-${response.id}`))

  const onPropertyChanged = (property: string, value: any) => {
    onResponseChange({ ...response, [property]: value })
  }

  return (
    <Container>
      <Row>
        <DropDown
          label={'Response Status'}
          className={style.responseCodeSelect}
          data={httpStatusCodes.map(item => ({ label: item.title, value: item.status }))}
          value={response.statusCode}
          onChange={(value) => onPropertyChanged('statusCode', value)}
        />
        <Input label={'Description'} value={response.description} onChange={(event) => onPropertyChanged('description', event?.target.value)} />
      </Row>
      <Row>
        <Checkbox label={'Is Active'} checked={response.isActive} onChange={(event) => onPropertyChanged('isActive', event.target.checked)} />
      </Row>
      <div className={style.subContainerExpandable}>
        <Tab.Group selectedIndex={selectedTab ?? 0} onChange={setSelectedTab}>
          <Tab.List className={style.tabs.listContainer}>
            <div className={style.tabs.list}>
              {availableTabs.map((tab, index) => (
                <Tab key={index} as={Fragment}>
                  {({ selected }) => (
                    <button className={selected ? style.tabs.activeItem : style.tabs.item}>
                      {tab}
                    </button>
                  )}
                </Tab>
              ))}
            </div>
          </Tab.List>
          <Tab.Panels className={style.subContainerExpandable}>
            <Tab.Panel className={style.tabs.container}>
              <TemplateEditor
                className={style.editor}
                onChange={(value) => onPropertyChanged('template', value)}
                value={response.template ?? ''}
              />
            </Tab.Panel>
            <Tab.Panel className={style.tabs.container}>
              <HeadersEditor
                headers={response.headers ?? []}
                onHeadersChange={(headers) => onPropertyChanged('headers', headers)}
              />
            </Tab.Panel>
            <Tab.Panel className={style.tabs.container}>
              <RulesEditor
                rules={response.rules ?? []}
                onRulesChange={(rules) => onPropertyChanged('rules', rules)}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Container>
  )
}
