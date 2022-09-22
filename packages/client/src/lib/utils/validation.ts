export const isEmpty = (str?: string | null): boolean => (!str || str.length === 0)

export const isUrlValid = (url: string) => {
  try {
    return !!new URL(url)
  } catch (e) {
    return false
  }
}

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return !!email.match(regexEmail)
}
