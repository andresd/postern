export const capitalizeWords = (text: string) => {
  return text.replace(/(?:^|\s)\S/g, (a) => { return a.toUpperCase() })
}

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const splitWords = (words: string) => {
  const output: string[] = []
  const regex = /([A-Za-z]?)([a-z]+)/g

  let match = regex.exec(words)
  while (match) {
    // output.push(match.join(""));
    output.push([match[1].toUpperCase(), match[2]].join(''))
    match = regex.exec(words)
  }

  return output
}
