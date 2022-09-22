import { Options } from '@components/hooks'
import { css } from '@emotion/css'
import { Theme } from '@styles/theme'

const heights = {
  tiny: '26px',
  small: '28px',
  medium: '32px',
  large: '44px'
}

const buttonTypography = {
  large: {
    fontFamily: 'Inter',
    fontSize: '18px',
    lineHeight: '20px',
    fontWeight: 400,
    fontStyle: 'normal'
  },
  medium: {
    fontFamily: 'Inter',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    fontStyle: 'normal'
  },
  small: {
    fontFamily: 'Inter',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    fontStyle: 'normal'
  },
  tiny: {
    fontFamily: 'Inter',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    fontStyle: 'normal'
  }
}

export const styles = (theme: Theme, { size }: Options) => ({
  content: css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
  }),
  default: {
    primary: {
      spinnerColor: theme.buttonDefaultPrimarySpinnerColor,
      base: {
        height: heights[size],
        borderRadius: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        padding: '0px 15px',
        ...buttonTypography[size]
      },
      default: {
        backgroundColor: theme.buttonDefaultPrimaryDefaultBackground,
        color: theme.buttonDefaultPrimaryDefaultColor
      },
      hover: {
        backgroundColor: theme.buttonDefaultPrimaryHoverBackground,
        color: theme.buttonDefaultPrimaryHoverColor
      },
      disabled: {
        backgroundColor: theme.buttonDefaultPrimaryDisabledBackground,
        color: theme.buttonDefaultPrimaryDisabledColor
      },
      loading: {
        backgroundColor: theme.buttonDefaultPrimaryLoadingBackground,
        color: theme.buttonDefaultPrimaryLoadingColor
      }
    },
    secondary: {
      spinnerColor: theme.buttonDefaultSecondarySpinnerColor,
      base: {
        height: heights[size],
        borderRadius: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        border: 'none',
        padding: '0px 20px',
        ...buttonTypography[size]
      },
      default: {
        backgroundColor: theme.buttonDefaultSecondaryDefaultBackground,
        color: theme.buttonDefaultSecondaryDefaultColor,
        border: theme.buttonDefaultSecondaryDefaultBorderColor ? `1px solid ${theme.buttonDefaultSecondaryDefaultBorderColor}` : 'none'
      },
      hover: {
        backgroundColor: theme.buttonDefaultSecondaryHoverBackground,
        color: theme.buttonDefaultSecondaryHoverColor,
        border: theme.buttonDefaultSecondaryHoverBorderColor ? `1px solid ${theme.buttonDefaultSecondaryHoverBorderColor}` : 'none'
      },
      disabled: {
        backgroundColor: theme.buttonDefaultSecondaryDisabledBackground,
        color: theme.buttonDefaultSecondaryDisabledColor,
        border: theme.buttonDefaultSecondaryDisabledBorderColor ? `1px solid ${theme.buttonDefaultSecondaryDisabledBorderColor}` : 'none'
      },
      loading: {
        backgroundColor: theme.buttonDefaultSecondaryLoadingBackground,
        color: theme.buttonDefaultSecondaryLoadingColor,
        border: theme.buttonDefaultSecondaryLoadingBorderColor ? `1px solid ${theme.buttonDefaultSecondaryLoadingBorderColor}` : 'none'
      }
    },
    tertiary: {
      spinnerColor: theme.buttonDefaultTertiarySpinnerColor,
      base: {
        height: heights[size],
        borderRadius: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        border: 'none',
        padding: '0px 20px',
        ...buttonTypography[size]
      },
      default: {
        backgroundColor: theme.buttonDefaultTertiaryDefaultBackground,
        color: theme.buttonDefaultTertiaryDefaultColor
      },
      hover: {
        backgroundColor: theme.buttonDefaultTertiaryHoverBackground,
        color: theme.buttonDefaultTertiaryHoverColor,
        border: theme.buttonDefaultTertiaryHoverBorderColor ? `1px solid ${theme.buttonDefaultTertiaryHoverBorderColor}` : 'none'
      },
      disabled: {
        backgroundColor: theme.buttonDefaultTertiaryDisabledBackground,
        color: theme.buttonDefaultTertiaryDisabledColor
      },
      loading: {
        backgroundColor: theme.buttonDefaultTertiaryLoadingBackground,
        color: theme.buttonDefaultTertiaryLoadingColor
      }
    }
  },
  destructive: {
    primary: {
      spinnerColor: theme.buttonDestructivePrimarySpinnerColor,
      base: {
        height: heights[size],
        borderRadius: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        border: 'none',
        padding: '0px 20px',
        ...buttonTypography[size]
      },
      default: {
        backgroundColor: theme.buttonDestructivePrimaryDefaultBackground,
        color: theme.buttonDestructivePrimaryDefaultColor
      },
      hover: {
        backgroundColor: theme.buttonDestructivePrimaryHoverBackground,
        color: theme.buttonDestructivePrimaryHoverColor
      },
      disabled: {
        backgroundColor: theme.buttonDestructivePrimaryDisabledBackground,
        color: theme.buttonDestructivePrimaryDisabledColor
      },
      loading: {
        backgroundColor: theme.buttonDestructivePrimaryLoadingBackground,
        color: theme.buttonDestructivePrimaryLoadingColor
      }
    },
    secondary: {
      spinnerColor: theme.buttonDestructiveSecondarySpinnerColor,
      base: {
        height: heights[size],
        borderRadius: '2px',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        padding: '0px 20px',
        ...buttonTypography[size]
      },
      default: {
        backgroundColor: theme.buttonDestructiveSecondaryDefaultBackground,
        color: theme.buttonDestructiveSecondaryDefaultColor,
        border: `1px solid ${theme.buttonDestructiveSecondaryDefaultBorderColor}`
      },
      hover: {
        backgroundColor: theme.buttonDestructiveSecondaryHoverBackground,
        color: theme.buttonDestructiveSecondaryHoverColor,
        border: `1px solid ${theme.buttonDestructiveSecondaryHoverBorderColor}`
      },
      disabled: {
        backgroundColor: theme.buttonDestructiveSecondaryDisabledBackground,
        color: theme.buttonDestructiveSecondaryDisabledColor,
        border: `1px solid ${theme.buttonDestructiveSecondaryDisabledBorderColor}`
      },
      loading: {
        backgroundColor: theme.buttonDestructiveSecondaryLoadingBackground,
        color: theme.buttonDestructiveSecondaryLoadingColor,
        border: `1px solid ${theme.buttonDestructiveSecondaryLoadingBorderColor}`
      }
    },
    tertiary: {
      spinnerColor: theme.buttonDestructiveTertiarySpinnerColor,
      base: {
        height: heights[size],
        borderRadius: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        border: 'none',
        padding: '0px 20px',
        ...buttonTypography[size]
      },
      default: {
        backgroundColor: theme.buttonDestructiveTertiaryDefaultBackground,
        color: theme.buttonDestructiveTertiaryDefaultColor
      },
      hover: {
        backgroundColor: theme.buttonDestructiveTertiaryHoverBackground,
        color: theme.buttonDestructiveTertiaryHoverColor,
        border: 'none'
      },
      disabled: {
        backgroundColor: theme.buttonDestructiveTertiaryDisabledBackground,
        color: theme.buttonDestructiveTertiaryDisabledColor
      },
      loading: {
        backgroundColor: theme.buttonDestructiveTertiaryLoadingBackground,
        color: theme.buttonDestructiveTertiaryLoadingColor
      }
    }
  }
})
