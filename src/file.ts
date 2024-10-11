import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'

/**
 * @description look for the file from the current or parent directory recursively
 * @example
 * ```
 * let file = resolveFile('package.json')
 * let pkg = readJSONFile(file)
 * ```
 */
export function resolveFile(filename: string) {
  let dir = __dirname
  for (;;) {
    let file = join(dir, filename)
    if (existsSync(file)) {
      return file
    }
    dir = join(dir, '..')
    if (resolve(dir) == '/') {
      throw new Error('file not found: ' + JSON.stringify(filename))
    }
  }
}

/**
 * @description read file as json data
 * @throws JSONFileError
 */
export function readJSONFile(file: string) {
  let text = readFileSync(file).toString()
  try {
    return JSON.parse(text)
  } catch (error) {
    throw new JSONFileError(
      file,
      'failed to parse json file: ' + JSON.stringify(file),
    )
  }
}

/**
 * @description write json data to file
 * @throws JSONFileError
 */
export function writeJSONFile(file: string, data: any) {
  let text: string
  try {
    text = JSON.stringify(data, null, 2)
  } catch (error) {
    throw new JSONFileError(
      file,
      'failed to serialize json file: ' + JSON.stringify(file),
    )
  }
  writeFileSync(file, text)
}

export class JSONFileError extends Error {
  constructor(public file: string, reason: string) {
    super(reason)
  }
}
