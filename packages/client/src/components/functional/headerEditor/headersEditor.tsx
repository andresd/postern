import { useStyles } from '@components/hooks'
import { Button } from '@components/primitives'
import { Header } from '@postern/core'
import { HTMLAttributes } from 'react'
import { SingleHeaderEditor } from './singleHeaderEditor'
import { styles } from './styles'

type HeadersEditorProps = {
  headers: Header[]
  onHeadersChange: (headers: Header[]) => void
} & HTMLAttributes<HTMLDivElement>

const EMPTY_HEADER = { enabled: true, key: '', value: '' }

export const HeadersEditor = (props: HeadersEditorProps) => {
  const { headers, onHeadersChange, ...rest } = props

  const style = useStyles(styles)

  const handleEdit = (index: number, header: Header) => {
    const updatedHeaders = [...headers]
    updatedHeaders[index] = header
    onHeadersChange(updatedHeaders)
  }

  const handleRemove = (index: number) => {
    onHeadersChange(headers.filter((_, i) => i !== index))
  }

  const handleAdd = () => {
    onHeadersChange([...headers, EMPTY_HEADER])
  }

  return (
    <div id={'HEADER'} {...rest}>
      <div className={style.container}>
        {headers?.map((header, index) => (
          <div key={index} className={style.row.container}>
            <SingleHeaderEditor index={index} header={header} onChange={handleEdit} />
            <div className={style.row.icon}>
              <Button size={'tiny'} icon={'trash'} onClick={() => handleRemove(index)} />
            </div>
          </div>
        ))}
        <div className={style.row.container}>
          <Button onClick={handleAdd} size={'tiny'} icon={'add'} >Add Header</Button>
        </div>
      </div>
    </div >
  )
}
