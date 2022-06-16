import { css, cx } from '@emotion/css'

const stylesParts = {
  contextMenu: css({
    zIndex: 10,
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#272822FF',
    color: '#fff',
    width: '200px',
    height: 'auto',
    padding: '3px',
    borderRadius: '4px',
    border: '1px solid #5C5D5A',
    boxShadow: '0px 6px 6px rgba(28, 29, 33, 0.06)'
  }),
  option: css({
    padding: '5px 10px',
    minWidth: 'calc(100% - 20px)',
    cursor: 'default',
    fontSize: '12px',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: '#5C5D5A',
      color: '#fff'
    },

    '&:active': {
      color: '#fff',
      backgroundColor: '#5C5D5A'
    }
  }),
  disabled: css({
    color: '#999999',
    pointerEvents: 'none'
  }),
  separator: css({
    width: '100%',
    height: '1px',
    padding: '0px',
    background: '#CCCCCC',
    margin: '2px 0px'
  })
}

export const styles = {
  contextMenu: stylesParts.contextMenu,
  option: stylesParts.option,
  disabled: cx(stylesParts.option, stylesParts.disabled),
  separator: css(stylesParts.option, stylesParts.separator)
}
