import { expect } from 'chai'
import { readJSONFile } from './file'

it('should parse json file with comments', () => {
  let json = readJSONFile('test/tsconfig.json')
  expect(json).deep.equals({
    background: ['#00000000', '#ffffffff'],
    flipX: true,
  })
})
