import { css, cx } from '@emotion/css'
import { Theme } from '@styles/theme'
import { typography } from '@styles/typography'

const arrowSize = '6px'
const tooltipHorizontalMargin = '6px'
const tooltipVerticalMargin = '38px'

const tooltip = (theme: Theme) => ({
  tip: css({
    position: 'absolute',
    borderRadius: '4px',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '6px',
    color: theme.tooltip.color,
    background: theme.tooltip.background,
    zIndex: 100,
    whiteSpace: 'nowrap',
    ...typography.text.medium.normal,
    label: 'tooltip',
    '&:before': {
      content: '" "',
      left: '50%',
      border: 'solid transparent',
      height: 0,
      width: 0,
      position: 'absolute',
      pointerEvents: 'none',
      borderWidth: arrowSize,
      marginLeft: `calc(${arrowSize} * 1)`
    }
  }),
  top: css({
    top: `calc(${tooltipVerticalMargin} * -1)`,
    label: 'top',
    '&:before': {
      top: '100%',
      borderTopColor: theme.tooltip.background
    }
  }),
  right: css({
    left: `calc(100% + ${tooltipHorizontalMargin})`,
    top: '50%',
    transform: 'translateX(0) translateY(-50%)',
    label: 'right',
    '&:before': {
      left: `calc(${arrowSize} * -3)`,
      top: '50%',
      transform: 'translateX(0) translateY(-50%)',
      borderRightColor: theme.tooltip.background
    }
  }),
  bottom: css({
    bottom: `calc(${tooltipVerticalMargin} * -1)`,
    label: 'bottom',
    '&:before': {
      bottom: '100%',
      borderBottomColor: theme.tooltip.background
    }
  }),
  left: css({
    left: 'auto',
    right: `calc(100% + ${tooltipHorizontalMargin})`,
    top: '50%',
    transform: 'translateX(0) translateY(-50%)',
    label: 'left',
    '&:before': {
      left: 'auto',
      right: `calc(${arrowSize} * -2)`,
      top: '50%',
      transform: 'translateX(0) translateY(-50%)',
      borderLeftColor: theme.tooltip.background
    }
  })
})

export const styles = (theme: Theme) => ({
  wrapper: css({
    display: 'inline-block',
    position: 'relative'
  }),
  tip: (placement: 'top' | 'right' | 'bottom' | 'left') => {
    switch (placement) {
      case 'top':
        return cx(tooltip(theme).tip, tooltip(theme).top)
      case 'right':
        return cx(tooltip(theme).tip, tooltip(theme).right)
      case 'bottom':
        return cx(tooltip(theme).tip, tooltip(theme).bottom)
      case 'left':
        return cx(tooltip(theme).tip, tooltip(theme).left)
    }
  }
})
