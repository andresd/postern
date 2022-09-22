import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

export const styles = (theme: Theme) => ({
  container: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    backgroundColor: theme.endpointListBackgroundColor,
    color: theme.endpointListColor
  }),
  row: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: 'calc(100% - 20px)',
    gap: '15px',
    cursor: 'pointer'
  }),
  selectedRow: css({
    backgroundColor: theme.endpointListItemBackgroundColor,
    color: theme.endpointListItemColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: 'calc(100% - 20px)',
    gap: '15px',
    cursor: 'pointer'
  }),
  method: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '70px',
    width: '70px',
    minHeight: '22px',
    height: '22px',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 700,
    textAlign: 'center',
    textShadow: '#888 0px 1px 0px'
  }),
  path: css({
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 500,
    flexDirection: 'row',
    flex: 1
  }),
  isActive: css({
    minWidth: '8px',
    height: '8px',
    borderRadius: '50%'
  }),
  name: css({
    marginLeft: '40px',
    fontSize: '13px',
    lineHeight: '20px',
    fontWeight: 300
  }),
  buttonsContainer: css({
    display: 'flex',
    flexDirection: 'row',
    gap: '3px'
  })
})
