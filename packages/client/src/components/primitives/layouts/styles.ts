import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

export const styles = (theme: Theme) => ({
  container: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    label: 'container'
  }),
  row: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    padding: '1px',
    gap: '10px',
    label: 'row'
  })
})
