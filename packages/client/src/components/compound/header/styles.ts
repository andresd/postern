import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

export const styles = (_theme: Theme) => ({
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    width: 'calc(100% - 25px)',
    margin: '0px 15px 0px 10px'
  })
})
