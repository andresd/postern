import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

export const styles = (theme: Theme) => ({
  container: css({
    backgroundColor: theme.endpointDetailsBackgroundColor,
    color: theme.endpointDetailsColor,
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  }),
  row: {
    container: css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      gap: '5px'
    }),
    icon: css({
      minWidth: '16px',
      height: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    })
  }
})
