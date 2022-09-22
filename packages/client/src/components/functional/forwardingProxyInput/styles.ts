import { css } from '@emotion/css'
import { Theme } from '@styles/theme'
import { typography } from '@styles/typography'

export const styles = (theme: Theme) => ({
  container: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '2px'
  }),
  label: css({
    minWidth: '74px',
    color: theme.input.label.color,
    ...typography.text.small.normal
  }),
  button: css({
    minWidth: '20px',
    maxWidth: '20px',
    padding: 0,
    ...typography.text.medium.normal
  }),
  input: css({
    width: '350px'
  })
})
