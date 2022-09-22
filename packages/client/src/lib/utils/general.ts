export const getUniqueNumber = (base = 36, length = undefined) => Math.random().toString(base).substr(2, length)

export const emptyImage = '/images/emptyImage.png'

export function filter<T>(raw: T, predicate: (value: any) => boolean): T {
  return Object.entries(raw)
    .filter(item => predicate(item[1]))
    .reduce((obj: any, item) => {
      const [key, value] = item
      obj[key] = value
      return obj
    }, {})
}

export function first<T, U>(raw: T, predicate: (value: U) => boolean): U {
  const filtered = Object.entries(raw).filter(item => predicate(item[1]))
  return filtered.length > 0 ? filtered[0][1] : undefined
}

type PredicateType = (value: any) => boolean

export const isUndefined = (value: any) => value === undefined
export const isNotUndefined = (value: any) => value !== undefined

export const ObjectToArray = <T>(obj: T, predicate?: PredicateType): any[] => {
  const newArray: any[] = []
  Object.keys(obj ?? {}).forEach(key => {
    if (predicate) {
      if (predicate(obj[key])) {
        newArray.push({ [key]: obj[key] })
      }
    } else {
      newArray.push({ [key]: obj[key] })
    }
  })
  return newArray
}

export const ObjectToPartial = <T extends object>(obj: T, predicate: PredicateType = isNotUndefined): T => {
  const newObj: T = {} as T
  Object.keys(obj ?? {}).forEach(key => {
    if (predicate(obj[key])) {
      newObj[key] = obj[key]
    }
  })
  return newObj
}

export const getKey = (key: string, obj: object) => {
  return key?.split('.').reduce((a, b) => a && a[b], obj)
}

const isUndefinedOrNull = (value: any) => value === undefined || value === null

export const omit = (obj: object, predicate: (value: any) => boolean = isUndefinedOrNull) => {
  const newObj = { ...obj }
  Object.keys(newObj).forEach(key => predicate(newObj[key]) && delete newObj[key])
  return newObj
}

export const omitByName = (obj: object, props: string[]) => {
  const newObj = { ...obj }
  Object.keys(newObj).forEach(key => props.includes(key) && delete newObj[key])
  return newObj
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const getUrlParts = (url: string) => {
  const parser = document.createElement('a')
  parser.href = url
  return {
    port: +parser.port || 80,
    protocol: parser.protocol,
    hostname: parser.host,
    baseUrl: `${parser.protocol}//${parser.host}`
  }
}
