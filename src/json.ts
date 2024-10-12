/**
 * @description remove comments from json text
 */
export function removeComments(text: string) {
  text = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => !line.startsWith('//'))
    .join('\n')
  for (;;) {
    let start = text.indexOf('/*')
    if (start == -1) {
      break
    }
    let end = text.indexOf('*/', start + 2)
    if (end == -1) {
      break
    }
    let before = text.slice(0, start)
    let after = text.slice(end + 2)
    text = before + after
  }
  return text
}
