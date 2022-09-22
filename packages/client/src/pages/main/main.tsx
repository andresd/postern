import { Header, Toolbar } from '@components/compound'
import { EndpointDetails, EndPointList, TerminalView } from '@components/functional'
import { useStyles } from '@components/hooks'
import { splitSizeChangedState } from '@state/general/atoms'
import '@styles/gutters.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Split from 'react-split'
import { useSetRecoilState } from 'recoil'
import { styles } from './styles'

export const Main = () => {
  const style = useStyles(styles)

  const setSplitSizeChanged = useSetRecoilState(splitSizeChangedState)

  const handleDragEnd = (sizes?: number[]) => {
    sizes && setSplitSizeChanged(sizes)
    window.dispatchEvent(new Event('resize'))
  }

  return (
    <div className={style.container}>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Toolbar />
        <div className={style.main}>
          <Split className={style.splitVertical} direction='vertical' gutterSize={5} sizes={[70, 30]} minSize={[17, 17]} onDragEnd={(sizes) => handleDragEnd(sizes)}>
            <Split className={style.splitHorizontal} gutterSize={5} sizes={[30, 70]} minSize={[17, 17]} onDragEnd={() => handleDragEnd()}>
              <EndPointList className={style.list} />
              <EndpointDetails className={style.details} />
            </Split>
            <TerminalView className={style.terminal} />
          </Split>
        </div>
      </DndProvider>
    </div>
  )
}
