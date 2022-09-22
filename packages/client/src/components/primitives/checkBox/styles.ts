import { Options } from '@components/hooks'
import { css } from '@emotion/css'
import { Theme } from '@styles/theme'
import { typography } from '@styles/typography'

export const styles = (theme: Theme, { isChecked, isFocused, isHover, isDisabled }: Options) => {
  const checkedDefaultBackgroundColor = theme.checkbox.checked.default.background
  const checkedDefaultColor = theme.checkbox.checked.default.iconColor
  const checkedHoverBackgroundColor = theme.checkbox.checked.hover.background

  const checkedHoverColor = theme.checkbox.checked.hover.iconColor
  const checkedFocusedBackgroundColor = theme.checkbox.checked.focused.background
  const checkedFocusedColor = theme.checkbox.checked.focused.iconColor
  const checkedDisabledBackgroundColor = theme.checkbox.checked.disabled.background
  const checkedDisabledColor = theme.checkbox.checked.disabled.iconColor

  const uncheckedDefaultBackgroundColor = theme.checkbox.unchecked.default.background
  const uncheckedHoverBackgroundColor = theme.checkbox.unchecked.hover.background
  const uncheckedFocusedBackgroundColor = theme.checkbox.unchecked.focused.background
  const uncheckedDisabledBackgroundColor = theme.checkbox.unchecked.disabled.background

  const getBackgroundColor = ({ disabled = isDisabled, focused = isFocused, hover = isHover, checked = isChecked }) => {
    if (disabled) {
      return checked ? checkedDisabledBackgroundColor : uncheckedDisabledBackgroundColor
    }
    if (focused) {
      return checked ? checkedFocusedBackgroundColor : uncheckedFocusedBackgroundColor
    }
    if (hover) {
      return checked ? checkedHoverBackgroundColor : uncheckedHoverBackgroundColor
    }
    return checked ? checkedDefaultBackgroundColor : uncheckedDefaultBackgroundColor
  }

  const getColor = ({ disabled = isDisabled, focused = isFocused, hover = isHover, checked = isChecked }) => {
    if (disabled) {
      return checked ? checkedDisabledColor : 'transparent'
    }
    if (focused) {
      return checked ? checkedFocusedColor : 'transparent'
    }
    if (hover) {
      return checked ? checkedHoverColor : 'transparent'
    }
    return checked ? checkedDefaultColor : 'transparent'
  }

  const getOutlineColor = ({ focused = isFocused, checked = isChecked }) => {
    if (focused) {
      return checked ? theme.checkbox.checked.focused.outlineColor : theme.checkbox.unchecked.focused.outlineColor
    }
    return 'transparent'
  }

  const getBorderColor = ({ disabled = isDisabled, focused = isFocused, hover = isHover, checked = isChecked }) => {
    if (disabled) {
      return checked ? theme.checkbox.checked.focused.borderColor : theme.checkbox.unchecked.disabled.borderColor
    }
    if (focused) {
      return checked ? 'transparent' : theme.checkbox.unchecked.focused.borderColor
    }
    if (hover) {
      return checked ? 'transparent' : theme.checkbox.unchecked.hover.borderColor
    }
    return checked ? 'transparent' : theme.checkbox.unchecked.default.borderColor
  }

  return {
    container: css({
      margin: 0,
      width: '16px',
      height: '16px',
      backgroundColor: getBackgroundColor({}),
      outline: `1px solid ${getOutlineColor({})}`,
      outlineOffset: '1px',
      border: `1px solid ${getBorderColor({})}`,
      borderRadius: '2px',
      '&:disabled': {
        backgroundColor: getBackgroundColor({ disabled: true }),
        cursor: 'not-allowed'
      }
    }),
    label: css({
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: '4px'
    }),
    labelText: css({
      ...typography.text.medium.normal,
      color: theme.checkbox.label.color,
      background: theme.checkbox.label.background
    }),
    input: css({
      appearance: 'none',
      backgroundColor: getColor({}),
      margin: 0,
      width: '10px',
      height: '10px',
      border: 'none',
      transform: 'translate(28%, 28%)',
      display: 'grid',
      placeContent: 'center',
      clipPath: isChecked ? 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)' : undefined,
      '&:disabled': {
        backgroundColor: getColor({ disabled: true }),
        cursor: 'not-allowed'
      }
    })
  }
}
