import { createInterface, ReadLineOptions } from 'readline'

/**
 * @description async io interface based on `readline.createInterface()`.
 * With internal buffer to avoid data lose when pasting multi-lines input.
 */
export function createIO(
  options: {
    input?: ReadLineOptions['input'] // default process.stdin
    output?: ReadLineOptions['output'] // default process.stdout
  } = {},
) {
  let io = createInterface({
    input: options.input || process.stdin,
    output: options.output || process.stdout,
  })
  let lines: string[] = []
  let listeners: Array<() => void> = []
  function loop() {
    io.question('', line => {
      lines.push(line)
      loop()
      if (listeners.length > 0) {
        let [listener] = listeners.splice(0, 1)
        listener()
      }
    })
  }
  function question(question: string) {
    return new Promise<string>((resolve, reject) => {
      process.stdout.write(question, err => {
        if (err) {
          reject(err)
          return
        }
        function consume() {
          let [line] = lines.splice(0, 1)
          resolve(line)
        }
        if (lines.length > 0) {
          consume()
        } else {
          listeners.push(consume)
        }
      })
    })
  }
  function flush() {
    return lines.splice(0, lines.length)
  }
  function close() {
    io.close()
  }
  loop()
  return { question, close, flush }
}
