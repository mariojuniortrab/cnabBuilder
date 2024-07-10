'use strict';

import YargsAdapter from './yargsAdapter.js'
import FileConfigurer from './fileConfigurer.js'
import handleCnabFile from './cnabFileHandler.js'
import handleError from './errorHandler.js'

const yargsAdapter = new YargsAdapter()

console.time('leitura Async')
new FileConfigurer(yargsAdapter.path)
  .readFile()
  .then(await handleCnabFile(yargsAdapter.yargs))
  .catch(handleError)
  .finally(console.timeEnd('leitura Async'))
