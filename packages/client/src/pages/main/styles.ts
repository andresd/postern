import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

export const styles = (theme: Theme) => ({
  container: css({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: theme.primaryColor6,
    backgroundColor: theme.primaryColor1,
    fontFamily: 'arial'
  }),
  main: css({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: '10px'
  }),
  splitHorizontal: css({
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%'
  }),
  splitVertical: css({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    height: '100%'
  }),
  list: css({
    width: 'calc(100% - 30px)',
    height: 'calc(100% - 20px)',
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 10px 10px 20px',
    overflow: 'auto'
  }),
  details: css({
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    margin: '10px'
  }),
  terminal: css({
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    padding: '10px'
  })
})
