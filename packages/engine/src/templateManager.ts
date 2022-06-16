/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { faker } from '@faker-js/faker'
import { Response } from '@postern/core'
import Handlebars, { HelperDelegate } from 'handlebars'
import { countries } from './countries'

const vars = {}

Handlebars.registerHelper('faker', (text: string) => {
  return faker.fake(`{{${text}}}`)
})

Handlebars.registerHelper('setvar', (text: string) => {
  const [name, value] = text.split('=')
  vars[name] = faker.fake(`{{${value}}}`)
  return ''
})

Handlebars.registerHelper('getvar', (text: string) => {
  return vars[text] ?? ''
})

Handlebars.registerHelper('oneOf', (text: string) => {
  const options = text.split('|')
  return options[Math.floor(Math.random() * options.length)]
})

Handlebars.registerHelper('geo', (text: string) => {
  const args = text.split(',').map(arg => arg.trim())
  const [argKey, part] = args

  const key = vars[argKey] ?? argKey

  const country = countries.find(country => country.code === key || country.name === key)

  if (!country) {
    return null
  }

  switch (part) {
    case 'lat':
    case 'latitude':
      return country.latitude
    case 'lng':
    case 'longitude':
      return country.longitude
    case 'code':
      return country.code
    case 'name':
    case 'country':
      return country.name
    default:
      return null
  }
})

const duplicateHandler: HelperDelegate = (times, options) => {
  let result = ''

  for (let i = 0; i < times; i++) {
    if (i > 0 && i < times) {
      result += ','
    }
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    result = result + options.fn(this)
  }

  return result
}

Handlebars.registerHelper('duplicate', duplicateHandler)

export const generateBody = (response?: Response) => {
  if (!response) {
    return ''
  }
  const templateStr = JSON.stringify(response.template ?? {})
  const dictionary = response.dictionary
  const template = Handlebars.compile(templateStr)
  return template(dictionary)
}
