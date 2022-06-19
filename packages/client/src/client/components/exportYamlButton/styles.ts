import { css } from '@emotion/css'

export const styles = {
  button: css({
    backgroundColor: '#272822',
    color: '#fff',
    width: 'auto',
    height: '30px',
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
