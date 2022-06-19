import { css } from '@emotion/css'

export const styles = {
  container: css({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
    backgroundColor: '#272822',
    fontFamily: 'arial'
  }),
  top: css({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '30px',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5px',
    gap: '10px'
  }),
  topButton: css({
    fontSize: '14px',
    backgroundColor: '#272822',
    color: '#fff',
    padding: '2px 4px',
    width: 'auto',
    height: '20px',
    borderRadius: '3px',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#5C5D5A',
    outlineStyle: 'none',
    '&:hover': {
      backgroundColor: '#5C5D5A'
    }
  }),
  topItem: css({
    fontSize: '14px',
    backgroundColor: '#272822',
    padding: '2px 4px',
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
  topItem2: css({
    fontSize: '14px',
    backgroundColor: '#272822',
    padding: '2px 4px',
    color: '#fff',
    width: '100%',
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
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  }),
  details: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto'
  }),
  terminal: css({
    hidth: '100%',
    height: '100%',
    padding: '10px'
  })
}
