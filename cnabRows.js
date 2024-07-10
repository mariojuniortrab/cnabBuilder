'use strict';

import YargsAdapter from './yargsAdapter.js'
import FileConfigurer from './fileConfigurer.js'
import handleCnabFile from './cnabFileHandler.js'
import handleError from './errorHandler.js'

const { from, to, segmento, path } = YargsAdapter.getOptions()

console.time('leitura Async')

new FileConfigurer(path)
  .readFile()
  .then(handleCnabFile(from, to, segmento))
  .catch(handleError)
  .finally(console.timeEnd('leitura Async'))
