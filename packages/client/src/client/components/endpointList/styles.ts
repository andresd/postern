import { css } from '@emotion/css'

export const styles = {
  container: css({
    width: '100%',
    height: '100%',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
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
    backgroundColor: '#5C5D5A',
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
    flex: 1
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
  }),
  buttons: css({
    backgroundColor: '#272822',
    color: '#fff',
    width: '20px',
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
  })
}
