'use strict';

import Logger from './logger.js'
import CnabFileManager from './cnabFileManager.js'
import YargsAdapter from './yargsAdapter.js';
import FileConfigurer from './fileConfigurer.js';

const { from, to, segmento } = YargsAdapter.getOptions()

console.time('leitura Async')

new FileConfigurer().readFile()
  .then(file => {
    const cnabFileManager = new CnabFileManager(file)

    if (segmento === 'p') {
      const logger = new Logger(cnabFileManager.cnabBodySegmentoP, segmento, from, to)
      logger.log()
      return
    }

    if (segmento === 'q') {
      const logger = new Logger(cnabFileManager.cnabBodySegmentoQ, segmento, from, to)
      logger.log()
      return
    }

    if (segmento === 'r') {
      const logger = new Logger(cnabFileManager.cnabBodySegmentoR, segmento, from, to)
      logger.log()
      return
    }

  })
  .catch(error => {
    console.log("🚀 ~ file: cnabRows.js ~ line 76 ~ error", error)
  })
console.timeEnd('leitura Async')
