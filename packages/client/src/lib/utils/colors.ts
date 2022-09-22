export const rgba2hex = (orig: string, ignoreAlpha?: boolean) => {
  const rgb: any = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)
  let hex = rgb
    ? (rgb[1] | 1 << 8).toString(16).slice(1) +
    (rgb[2] | 1 << 8).toString(16).slice(1) +
    (rgb[3] | 1 << 8).toString(16).slice(1)
    : orig

  if (ignoreAlpha) {
    return hex
  }

  const alpha = ((rgb && rgb[4]) || '').trim()
  let a = (alpha !== '') ? alpha : 1
  // multiply before convert to HEX
  a = ((a * 255) | 1 << 8).toString(16).slice(1)
  hex = '#' + hex + a

  return hex
}

export const hexToObject = (hex: string) => {
  let c: any
  if (/^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255 }
  }
  throw new Error('Bad Hex')
}

export const invertColor = (hex: string) => {
  hex = rgba2hex(hex)
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length > 8) {
    throw new Error('Invalid HEX color.')
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16)
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16)
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}

export const padZero = (str: string, len = 2) => {
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export const hexToRgbA = (hex: string) => {
  let c: any
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('')
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]]
    }
    c = '0x' + c.join('')
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
  }
  throw new Error('Bad Hex')
}
