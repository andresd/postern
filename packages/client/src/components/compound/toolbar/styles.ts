import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

export const styles = (theme: Theme) => ({
  container: css({
    display: 'flex',
    flexDirection: 'row',
    width: 'calc(100% - 60px)',
    height: '30px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 30px',
    gap: '10px',
    border: 'none',
    borderTop: `1px solid ${theme.primaryColor2}`,
    borderBottom: `1px solid ${theme.primaryColor2}`
  }),
  group: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '10px'
  })
})
