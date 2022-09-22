import { Logo, ServerInfo } from '@components/functional'
import { useStyles } from '@components/hooks'
import { styles } from './styles'

export const Header = () => {
  const style = useStyles(styles)

  return (
    <div className={style.container}>
      <Logo />
      <ServerInfo />
    </div>
  )
}
