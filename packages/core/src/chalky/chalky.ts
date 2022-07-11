
export const hexToRgb = (hex: string | number) => {
  const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16))
  if (!matches) {
    return [0, 0, 0]
  }

  if (!matches.groups) {
    return []
  }

  let { colorString } = matches.groups

  if (colorString.length === 3) {
    colorString = [...colorString].map(character => character + character).join('')
  }

  const integer = Number.parseInt(colorString, 16)

  return [
    /* eslint-disable no-bitwise */
    (integer >> 16) & 0xFF,
    (integer >> 8) & 0xFF,
    integer & 0xFF
    /* eslint-enable no-bitwise */
  ]
}

class Chalky {
  private _stack: string[] = []
  private _closeFlag = '\x1b[0m'

  public bold() {
    this._stack.push('\x1b[1m')
    return this
  }

  public frColor(hex: string) {
    const colorFlag = `\x1b[38;2;${hexToRgb(hex).join(';')}m`
    this._stack.push(colorFlag)
    return this
  }

  public bgColor(hex: string) {
    const colorFlag = `\x1b[48;2;${hexToRgb(hex).join(';')}m`
    this._stack.push(colorFlag)
    return this
  }

  public toString(text: string) {
    const result = [this._stack.join(''), text, this._closeFlag] // .repeat(stackSize)
    this._stack = []
    return result.join('')
  }
}

const chalkyImp = new Chalky()

export const chalky = chalkyImp
export default chalky
