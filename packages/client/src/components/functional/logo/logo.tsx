import { useStyles } from '@components/hooks'
import { styles } from './styles'

export const Logo = () => {
  const style = useStyles(styles)

  return (
    <div className={style.container}>
      <h1 className={style.h1}>Postern</h1>
    </div>
  )
}
