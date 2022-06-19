import { css } from '@emotion/css'

export const styles = {
  container: css({
    position: 'relative',
    gap: '4px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'

  }),
  logs: css({
    position: 'absolute',
    top: 30,
    left: 0,
    bottom: 0,
    overflow: 'auto',
    gap: '4px',
    fontFamily: 'monospace',
    fontSize: '14px',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column'
  }),
  topContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: '3px'
  }),
  buttonsContainer: css({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    gap: '3px'
  }),
  buttons: css({
    backgroundColor: '#272822',
    color: '#fff',
    width: 'auto',
    height: '20px',
    borderRadius: '3px',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    outlineStyle: 'none',
    '&:hover': {
      outlineStyle: 'solid',
      outlineColor: '#5C5D5A'
    }
  }),
  row: css({
    display: 'block'
  })
}
