import React from 'react'
import AceEditor, { IAceEditorProps } from 'react-ace'

import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/mode-handlebars'
import 'ace-builds/src-noconflict/theme-monokai'

import { splitSizeChangedState } from '@state/general/atoms'
import { useRecoilValue } from 'recoil'

export type TemplateEditorProps = IAceEditorProps

export const TemplateEditor = (props: TemplateEditorProps) => {
  const { style, className, ...rest } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const redraw = useRecoilValue(splitSizeChangedState)

  const handleSelectionChange = (newValue: string) => {
    // eslint-disable-next-line no-console
    console.debug('handleSelectionChange', newValue)
  }

  return (
    <div id='EDITOR_PARENT' style={style} className={className} >
      <AceEditor
        mode='handlebars'
        theme='monokai'
        name='template-editor'
        fontSize={14}
        width='100%'
        height='100%'
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        onSelectionChange={(e) => handleSelectionChange(e)}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2
        }}
        {...rest}
      />
    </div>
  )
}
