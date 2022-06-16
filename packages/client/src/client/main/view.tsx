import React, { } from 'react'
import { EndPointList } from '@components/endpointList'
import { ImportYamlButton } from '@components/importYamlButton'
import { ExportYamlButton } from '@components/exportYamlButton'
import { styles } from './styles'
import { EndpointDetails } from '@components/endpointDetails'
import Split from 'react-split'
import './gutters.css'
import { PortInput } from '@components/portInput'
import { TestEndpointButton } from '@components/testEndpoint'
import { TerminalView } from '@components/terminal'
import { useSetRecoilState } from 'recoil'
import { splitSizeChangedState } from '@lib/client/atoms'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { RedirectBaseUrlInput } from '@components/redirectBaseUrlInput'

export const View = () => {
  const setSplitSizeChanged = useSetRecoilState(splitSizeChangedState)

  const handleDragEnd = (sizes?: number[]) => {
    sizes && setSplitSizeChanged(sizes)
    window.dispatchEvent(new Event('resize'))
  }

  return (
    <div className={styles.container}>
      <DndProvider backend={HTML5Backend}>
        <div className={styles.top}>
          <ImportYamlButton className={styles.topButton} />
          <ExportYamlButton className={styles.topButton} />
          <PortInput className={styles.topItem} />
          <TestEndpointButton className={styles.topButton} />
          <RedirectBaseUrlInput className={styles.topItem2} />
        </div>
        <div className={styles.main}>
          <Split className={styles.splitVertical} direction='vertical' gutterSize={5} sizes={[50, 50]} minSize={[17, 17]} onDragEnd={(sizes) => handleDragEnd(sizes)}>
            <Split className={styles.splitHorizontal} gutterSize={5} minSize={[17, 17]} onDragEnd={() => handleDragEnd()}>
              <EndPointList className={styles.list} />
              <EndpointDetails className={styles.details} />
            </Split>
            <TerminalView className={styles.terminal} />
          </Split>
        </div>
      </DndProvider>
    </div>
  )
}
