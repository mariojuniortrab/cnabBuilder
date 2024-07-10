'use strict';

import YargsAdapter from './configs/yargsAdapter.js'
import FileConfigurer from './configs/fileConfigurer.js'
import handleCnabFile from './cnab/cnabFileHandler.js'
import handleError from './presentation/errorHandler.js'

const yargsAdapter = new YargsAdapter()

console.time('leitura Async')
new FileConfigurer(yargsAdapter.path)
  .readFile()
  .then(await handleCnabFile(yargsAdapter.yargs))
  .catch(handleError)
  .finally(console.timeEnd('leitura Async'))
