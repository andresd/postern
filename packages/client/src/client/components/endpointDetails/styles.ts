import { css } from '@emotion/css'

export const styles = {
  container: css({
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  }),
  subContainer: css({
    width: '100%',
    display: 'flex',
    backgroundColor: '#2A2B25',
    flexDirection: 'column'
  }),
  subContainerExpandable: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: '#373832',
    flexDirection: 'column'
  }),
  row: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    gap: '10px'
  }),
  select: css({
    backgroundColor: '#5C5D5A',
    color: '#fff',
    borderRadius: '3px',
    borderWidth: 0,
    borderStyle: 'none',
    borderColor: 'transparent',
    boxShadow: 'none',
    ':focus': {
      outline: '1px solid #398AfD !important',
      outlineOffset: '-1px !important'
    },
    height: '21px'
  }),
  input: css({
    flex: 1,
    ':focus': {
      outline: '1px solid #398AfD !important',
      outlineOffset: '-1px !important'
    }
  }),
  checkbox: css({
  }),
  editor: css({
    width: '100%',
    height: 'calc(100% - 20px)',
    overflow: 'auto'
  }),
  title: css({
    padding: '5px 0 5px 0',
    fontSize: '14px',
    fontWeight: 400
  }),
  tabs: {
    container: css({
      borderColor: '#5C5D5A',
      borderWidth: '1px',
      borderStyle: 'solid',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }),
    listContainer: css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }),
    list: css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
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
    }),
    isActive: css({
      width: '8px',
      height: '8px',
      borderRadius: '50%'
    }),
    activeItem: css({
      display: 'flex',
      flexDirection: 'row',
      gap: '5px',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#5C5D5A',
      color: '#fff',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderStyle: 'node',
      borderWidth: 0,
      borderColor: '#fff',
      outlineStyle: 'none',
      outlineWidth: 0,
      padding: '5px 10px',
      '&:hover': {
        outlineStyle: 'solid',
        outlineColor: '#777975',
        outlineWidth: '1px',
        outlineOffset: '-1px'
      }
    }),
    item: css({
      display: 'flex',
      flexDirection: 'row',
      gap: '5px',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#272822',
      color: '#fff',
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderStyle: 'node',
      borderWidth: 0,
      borderColor: '#fff',
      outlineStyle: 'none',
      outlineWidth: 0,
      padding: '5px 10px',
      '&:hover': {
        outlineStyle: 'solid',
        outlineColor: '#5C5D5A',
        outlineWidth: '1px',
        outlineOffset: '-1px'
      }
    })
  }
}
