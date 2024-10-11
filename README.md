# cli-helper

Helper library for cli applications

[![npm Package Version](https://img.shields.io/npm/v/cli-helper)](https://www.npmjs.com/package/cli-helper)

## Features

- Read from cli without missing from multiline pasting
- Typescript support

## Installation

```bash
npm install cli-helper
```

You can also install `cli-helper` with [pnpm](https://pnpm.io/), [yarn](https://yarnpkg.com/), or [slnpm](https://github.com/beenotung/slnpm)

## Usage Example

```typescript
import { createIO } from 'cli-helper'

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

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
