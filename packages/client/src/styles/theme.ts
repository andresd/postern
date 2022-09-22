export type Theme = Record<string, any>

// const isMacOs = /\bMac OS\b/i.test(navigator.userAgent)

export const scrollbars = {
  '::-webkit-scrollbar': {
    padding: '0 2px',
    maxWidth: '6px'
  },
  '::-webkit-scrollbar-track': {
    width: '6px',
    borderRadius: '4px',
    backgroundColor: 'transparent'
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    backgroundColor: '#555'
  },
  '::-webkit-scrollbar-thumb:hover': { background: '#555' }
}
