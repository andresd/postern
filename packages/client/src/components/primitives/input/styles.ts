import { css } from '@emotion/css'
import { Theme } from '@styles/theme'
import { typography } from '@styles/typography'

export const styles = (theme: Theme) => ({
  container: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }),
  label: css({
    ...typography.text.small.normal,
    color: theme.input.label.color,
    background: theme.input.label.background
  }),
  default: {
    container: css({
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.input.default.background,
      border: `1px solid ${theme.input.default.borderColor}`,
      borderRadius: '2px',
      padding: '8px',
      width: 'calc(100% - 18px)',
      height: '14px'
    }),
    hover: css({
      border: `1px solid ${theme.input.default.outlineHoverColor}`,
      outline: 'none'
    }),
    focus: css({
      border: `1px solid ${theme.input.default.outlineFocusColor}`,
      outline: 'none'
    }),
    prefixIcon: theme.input.default.prefixIcon,
    suffixIcon: theme.input.default.suffixIcon,
    input: css({
      border: 'none',
      backgroundColor: theme.input.default.background,
      color: theme.input.default.color,
      outline: 'none',
      width: '100%',
      '::placeholder': {
        color: theme.input.placeholderColor
      }
    }),
    errorRow: ''
  },
  readOnly: {
    container: css({
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.input.readOnly.background,
      border: `1px solid ${theme.input.readOnly.borderColor}`,
      borderRadius: '2px',
      padding: '8px',
      width: 'calc(100% - 18px)',
      height: '14px'
    }),
    hover: css({
      border: `1px solid ${theme.input.readOnly.outlineColor}`,
      outline: 'none'
    }),
    focus: css({
      border: `1px solid ${theme.input.readOnly.outlineColor}`,
      outline: 'none'
    }),
    prefixIcon: theme.input.readOnly.prefixIcon,
    suffixIcon: theme.input.readOnly.suffixIcon,
    input: css({
      border: 'none',
      backgroundColor: theme.input.readOnly.background,
      color: theme.input.readOnly.color,
      outline: 'none',
      width: '100%',
      '::placeholder': {
        color: theme.input.readOnly.placeholderColor
      }
    }),
    errorRow: ''
  },
  error: {
    container: css({
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.input.error.background,
      border: `1px solid ${theme.input.error.borderColor}`,
      borderRadius: '2px',
      padding: '8px',
      width: 'calc(100% - 18px)',
      height: '14px'
    }),
    hover: css({
      border: `1px solid ${theme.input.error.outlineColor}`,
      outline: 'none'
    }),
    focus: css({
      border: `1px solid ${theme.input.error.outlineColor}`,
      outline: 'none'
    }),
    prefixIcon: theme.input.error.prefixIcon,
    suffixIcon: theme.input.error.suffixIcon,
    input: css({
      border: 'none',
      backgroundColor: theme.input.error.background,
      color: theme.inputErrorColor,
      outline: 'none',
      width: '100%',
      '::placeholder': {
        color: theme.input.error.placeholderColor
      }
    })
  },
  errorIcon: theme.input.error.rowIconColor,
  errorRow: css({
    margin: '5px 0 0 2px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '5px',
    color: theme.input.error.rowColor,
    ...typography.text.small.normal
  })
})
