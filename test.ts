import { createIO } from './index'

async function main() {
  let io = createIO()
  for (;;) {
    let line = await io.question('> ')
    console.log('line:', line)
    if (line == 'exit') {
      break
    }
  }
  console.log('rest:', io.flush())
  io.close()
}
main().catch(e => console.error(e))
