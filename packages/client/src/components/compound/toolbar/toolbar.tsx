import { YamlExport, YamlImport, TestEndpointButton, ForwardingProxyInput } from '@components/functional'
import { useStyles } from '@components/hooks'
import { Checkbox, Tooltip } from '@components/primitives'
import { autoSyncServerState } from '@state/server/atoms'
import { useRecoilState } from 'recoil'
import { styles } from './styles'

export const Toolbar = () => {
  const style = useStyles(styles)

  const [autoCheckServer, setAutoCheckServer] = useRecoilState(autoSyncServerState)

  return (
    <div className={style.container}>
      <div className={style.group}>
        <YamlImport />
        <YamlExport />
        <TestEndpointButton />
      </div>
      <Checkbox checked={autoCheckServer} label={'Auto Sync'} onChange={event => setAutoCheckServer(event.target.checked)} />
    </div>

  )
}
