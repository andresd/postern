import { css } from '@emotion/css'

export const styles = {
  searchBox: css({}),
  popover: css({
    position: 'relative'
  }),
  dropdownItem: css({
    padding: 0,
    backgroundColor: '#000',
    fontWeights: 400
  }),
  dropDownContent: css({
    overflow: 'auto',
    borderWidth: 0,
    borderRadius: '3px',
    borderColor: 'transparent',
    padding: '12px',
    backgroundColor: '#000'
  }),
  dropdownItemHighlight: css({
    padding: 0,
    backgroundColor: '#a9a9a9',
    color: '#fff'
  }),
  dropdownHeaderLabel: css({
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginLeft: '12px',
    marginRight: '12px'
  }),
  dropdownHeader: css({
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: '3px',
    borderColor: 'transparent',
    width: '100%',
    height: '36px',
    backgroundColor: '#fff'
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
    display: 'flex',
    position: 'absolute',
    marginTop: '3px',
    zIndex: 10,
    borderWidth: 1,
    borderRadius: '3px',
    borderStyle: 'solid'
  }),
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

export default styles
