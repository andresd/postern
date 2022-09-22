import { css, cx } from '@emotion/css'
import { Theme } from '@styles/theme'
import { typography } from '@styles/typography'

export const styles = (theme: Theme) => ({
  label: css({
    ...typography.text.small.normal,
    display: 'inline-block',
    color: theme.primaryColor4,
    label: 'label'
  })
})
