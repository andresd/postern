import { css } from '@emotion/css'
import { Theme } from '@styles/theme'
import { typography } from '@styles/typography'

export const styles = (theme: Theme) => {
  return {
    label: css({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      gap: '4px'
    }),
    labelText: css({
      ...typography.text.small.normal,
      color: theme.dropDown.primary.label.color,
      background: theme.dropDown.primary.label.background
    }),
    primary: {
      chevronColor: theme.dropDown.primary.chevronColor,
      popover: css({
        position: 'relative',
        width: '100%'
      }),
      dropdownHeader: css({
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: `1px solid ${theme.dropDown.primary.header.borderColor}`,
        borderRadius: '2px',
        backgroundColor: theme.dropDown.primary.header.background,
        color: theme.dropDown.primary.header.Color,
        padding: '0px 12px 0px 8px',
        width: '100%',
        height: '32px',
        '&:focus': {
          border: `1px solid ${theme.dropDown.primary.header.borderFocusColor}`,
          outline: 'none'
        }
      }),
      dropdownHeaderLabel: css({
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
        color: theme.dropDown.primary.header.color,
        ...typography.text.medium.normal
      }),
      dropdownHeaderButton: css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '16px',
        height: '16px'
      }),
      popupPanel: css({
        position: 'absolute',
        marginTop: '1px',
        left: 0,
        right: 0,
        zIndex: 50
      }),
      dropDownContent: css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'auto',
        border: `1px solid ${theme.dropDown.primary.contentPanel.borderColor}`,
        borderRadius: '2px',
        boxShadow: theme.dropDown.primary.contentPanel.boxShadow,
        padding: '10px 0',
        backgroundColor: theme.dropDown.primary.contentPanel.background,
        color: theme.dropDown.primary.contentPanel.color,
        maxHeight: '250px',
        overflowY: 'auto'
      }),
      dropdownItem: css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: theme.dropDown.primary.item.background,
        color: theme.dropDown.primary.item.color,
        fontWeights: 400,
        width: 'calc(100% - 10px)',
        height: '36px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        verticalAlign: 'middle'
      }),
      dropdownItemHighlight: css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0 16px',
        backgroundColor: theme.dropDown.primary.item.hover.background,
        color: theme.dropDown.primary.item.hover.color,
        width: 'calc(100% - 10px)',
        height: '36px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        verticalAlign: 'middle'
      })
    },
    transitionEnter: css({
      transitionProperty: 'color, backgroundColor, borderColor, textDecorationColor, fill, stroke, opacity, boxShadow, transform, filter, backdropFilter',
      transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
      transitionDuration: '200ms'
    }),
    transitionEnterFrom: css({
      transform: 'translateY(0.25rem)',
      opacity: 0
    }),
    transitionEnterTo: css({
      transform: 'translateY(0px)',
      opacity: 1
    }),
    transitionLeave: css({
      transitionProperty: 'color, backgroundColor, borderColor, textDecorationColor, fill, stroke, opacity, boxShadow, transform, filter, backdropFilter',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
      transitionDuration: '150ms'
    }),
    transitionLeaveFrom: css({
      transform: 'translateY(0px)',
      opacity: 100
    }),
    transitionLeaveTo: css({
      transform: 'translateY(0.25rem)',
      opacity: 0
    })
  }
}
