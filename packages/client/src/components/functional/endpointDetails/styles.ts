import { css } from '@emotion/css'
import { Theme } from '@styles/theme'
import { typography } from '@styles/typography'

export const styles = (theme: Theme) => ({
  main: css({
    backgroundColor: theme.endpointDetailsBackgroundColor
  }),
  innerContainer: css({
    width: '100%',
    display: 'flex',
    backgroundColor: theme.endpointDetailsBackgroundColor,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }),
  subContainerExpandable: css({
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: theme.endpointDetailsSubBackgroundColor,
    flexDirection: 'column'
  }),
  select: css({
    width: '120px'
  }),
  responseCodeSelect: css({
    width: '300px'
  }),
  editor: css({
    width: '100%',
    height: '100%',
    overflow: 'auto'
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
      backgroundColor: theme.endpointDetailsActiveTabBackgroundColor,
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
      backgroundColor: theme.endpointDetailsTabBackgroundColor,
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
})
