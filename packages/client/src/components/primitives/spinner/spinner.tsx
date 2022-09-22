import SyncLoader from 'react-spinners/SyncLoader'
import { styles } from './styles'

type SpinnerProps = {
  color?: string,
  size?: number
}

export const Spinner = (props: SpinnerProps) => {
  const { color = '#231D49', size = 15 } = props
  return (
    <div className={styles.spinner}>
      <SyncLoader color={color} size={size} />
    </div>
  )
}
