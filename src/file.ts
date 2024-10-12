import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { removeComments } from './json'

/**
 * @description look for the file from the given directory or parent directory recursively
 * @example
 * ```
 * let file = resolveFile({ dir: __dirname, filename: 'package.json' })
 * let pkg = readJSONFile(file)
 * ```
 */
export function resolveFile(args: { dir: string; filename: string }) {
  let { dir, filename } = args
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
  text = removeComments(text)
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
export function writeJSONFile(
  file: string,
  data: any,
  options?: {
    top_comment?: string
    bottom_comment?: string
  },
) {
  let text: string
  try {
    text = JSON.stringify(data, null, 2)
  } catch (error) {
    throw new JSONFileError(
      file,
      'failed to serialize json file: ' + JSON.stringify(file),
    )
  }
  if (options?.top_comment) {
    text = options.top_comment + '\n' + text
  }
  if (options?.bottom_comment) {
    text = text + '\n' + options.bottom_comment
  }
  writeFileSync(file, text.trim() + '\n')
}

export class JSONFileError extends Error {
  constructor(public file: string, reason: string) {
    super(reason)
  }
}
