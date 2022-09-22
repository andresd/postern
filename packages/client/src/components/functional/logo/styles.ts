import { css } from '@emotion/css'
import { themePropertiesState } from '@state/general/atoms'
import { Theme } from '@styles/theme'

export const styles = (theme: Theme) => ({
  container: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '10px'
  }),
  h1: css({
    fontFamily: '"Unica One", cursive',
    fontSize: '34px',
    lineHeight: '40px',
    fontWeight: 400,
    fontStyle: 'normal',
    color: theme.primaryColor3
  })
})
