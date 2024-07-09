'use strict';

import path from 'path'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import Logger from './logger.js'
import CnabFileManager from './cnabFileManager.js'
import YargsAdapter from './yargsAdapter.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.resolve(`${__dirname}/cnabExample.rem`)

const { from, to, segmento } = YargsAdapter.getOptions()

console.time('leitura Async')

readFile(file, 'utf8')
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
