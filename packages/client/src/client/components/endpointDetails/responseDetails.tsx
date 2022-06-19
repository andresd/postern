import React, { HTMLAttributes } from 'react'
import { httpStatusCodes } from './httpStatusCodes'
import { styles } from './styles'
import { TemplateEditor } from '@components/templateEditor/templateEditor'
import { Response } from '@postern/core'

type ResponseDetailsProps = {
  response: Response
  onResponseChange: (response: Response) => void
} & HTMLAttributes<HTMLDivElement>

export const ResponseDetails = (props: ResponseDetailsProps) => {
  const { response, onResponseChange } = props

  const onPropertyChanged = (property: string, value: any) => {
    onResponseChange({ ...response, [property]: value })
  }

  return (
    <div id='RESPONSE_CONTAINER' className={styles.container}>
      <div className={styles.row}>
        <select className={styles.select} value={response.statusCode} onChange={(event) => onPropertyChanged('statusCode', +event.target.value)}>
          {httpStatusCodes.map((item, index: number) => (
            <option key={`status_${index}`} value={item.status}>{item.title}</option>
          ))}
        </select>
      </div>
      <div className={styles.row}>
        <input type={'checkbox'} className={styles.checkbox} checked={response.isActive} onChange={(event) => onPropertyChanged('isActive', event.target.checked)} />
        {'Is Active'}
      </div>
      <div className={styles.title}>Response Template:</div>
      <TemplateEditor
        className={styles.editor}
        onChange={(value) => onPropertyChanged('template', value)}
        value={response.template ?? ''}
      />
    </div>
  )
}
