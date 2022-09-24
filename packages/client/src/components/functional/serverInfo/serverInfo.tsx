import { useStyles } from '@components/hooks'
import { Button, Icon, Input, Tooltip } from '@components/primitives'
import { getUrlParts } from '@lib/utils'
import { isServerLive } from '@state/server/actions'
import { autoSyncServerState, serverHostState, serverPortState, updateServerDataFromRemoteStateCacheCallback, updateServerDataStateCacheCallback } from '@state/server/atoms'
import { HTMLAttributes, useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { ForwardingProxyInput } from '../forwardingProxyInput'
import { styles } from './styles'

type ServerInfoProps = HTMLAttributes<HTMLDivElement>

const SimpleMode = () => {
  const style = useStyles(styles)

  const [port, setPort] = useRecoilState(serverPortState)
  const setServerHost = useSetRecoilState(serverHostState)

  useEffect(() => {
    const url = `http://localhost:${port}`
    setServerHost(url)
  }, [port])

  return (
    <>
      <span>{'http://localhost:'}</span>
      <Input containerClassName={style.port} placeholder={'Port'} type='number' value={port} onChange={event => setPort(+event.target.value)} />
    </>
  )
}

export const ServerInfo = (props: ServerInfoProps) => {
  const { ...rest } = props

  const style = useStyles(styles)

  const [isLive, setIsLive] = useState(false)

  const autoSync = useRecoilValue(autoSyncServerState)
  const updateServer = useRecoilCallback(updateServerDataStateCacheCallback)
  const serverHost = useRecoilValue(serverHostState)
  const downloadFromServer = useRecoilCallback(updateServerDataFromRemoteStateCacheCallback)

  const checkIsLive = async () => {
    const status = await isServerLive(serverHost)
    setIsLive(status)
  }

  useInterval(async () => {
    try {
      await checkIsLive()
      if (autoSync) {
        await updateServer()
      }
    } catch (error) {
      console.error(error)
    }
  }, autoSync ? 15000 : null)

  const handleUploadToServer = async () => {
    await checkIsLive()
    updateServer()
  }

  const handleDownloadFromServer = async () => {
    await checkIsLive()
    downloadFromServer()
  }

  return (
    <div {...rest} className={style.row}>
      <ForwardingProxyInput />
      <Tooltip content={isLive ? 'Online' : 'Offline'} placement={'bottom'}>
        <Button
          category={'tertiary'}
          size={'tiny'}
          style={{ width: '15px' }}
          onClick={checkIsLive}
        >
          <Icon name='circle' color={isLive ? 'green' : 'red'} size={25} />
        </Button>
      </Tooltip>
      <Tooltip content={'Get configuration data from server'} placement={'bottom'}>
        <Button onClick={handleDownloadFromServer} disabled={!isLive}><Icon name={'download'} /></Button>
      </Tooltip>
      <Tooltip content={'Update server configuration data'} placement={'bottom'}>
        <Button onClick={handleUploadToServer} disabled={!isLive}><Icon name={'upload'} /></Button>
      </Tooltip>
      <SimpleMode />
    </div>
  )
}
