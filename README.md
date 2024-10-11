# cli-helpers

Helper library for building cli applications

[![npm Package Version](https://img.shields.io/npm/v/cli-helpers)](https://www.npmjs.com/package/cli-helpers)

## Features

- **Multi-Line** I/O interface
  - **async** `io.question(text)` for ease of use
  - **buffered input** prevents data lost when pasting multi-line input
  - **customizable I/O stream** using `process.stdin` and `process.stdout` as default
  - **flushable buffer** to get pending input lines
- Typescript support

## Installation

```bash
npm install cli-helpers
```

You can also install `cli-helpers` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

```typescript
import { createIO } from 'cli-helpers'

async function main() {
  let io = createIO()
  for (;;) {
    let line = await io.question('> ')
    console.log('line:', line)
    if (line == 'exit') {
      break
    }
  }
  io.close()
}

main().catch(e => console.error(e))
```

## Typescript Signature

**io helper functions**:

```typescript
import { ReadLineOptions } from 'readline'

/**
 * @description async io interface based on `readline.createInterface()`.
 * With internal buffer to avoid data lose when pasting multi-lines input.
 */
export function createIO(options?: {
  input?: ReadLineOptions['input']
  output?: ReadLineOptions['output']
}): {
  question: (question: string) => Promise<string>
  close: () => void
  flush: () => string[]
}
```

**file helper functions**:

````typescript
/**
 * @description look for the file from the current or parent directory recursively
 * @example
 * ```
 * let file = resolveFile('package.json')
 * let pkg = readJSONFile(file)
 * ```
 */
export function resolveFile(filename: string): string

/**
 * @description read file as json data
 * @throws JSONFileError
 */
export function readJSONFile(file: string): any

/**
 * @description write json data to file
 * @throws JSONFileError
 */
export function writeJSONFile(file: string, data: any): void

export class JSONFileError extends Error {
  file: string
}
````

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
