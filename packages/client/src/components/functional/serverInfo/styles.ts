import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

export const styles = (theme: Theme) => ({
  row: css({
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '10px',
    color: theme.primaryColor3
  }),
  host: css({
    width: '400px'
  }),
  port: css({
    width: '80px'
  })
})
