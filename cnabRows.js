'use strict';

import path from 'path'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import Logger from './logger.js'
import CnabFileManager from './cnabFileManager.js'

import yargs from 'yargs'

const optionsYargs = yargs(process.argv.slice(2))
  .usage('Uso: $0 [options]')
  .option("f", { alias: "from", describe: "posição inicial de pesquisa da linha do Cnab", type: "number", demandOption: true })
  .option("t", { alias: "to", describe: "posição final de pesquisa da linha do Cnab", type: "number", demandOption: true })
  .option("s", { alias: "segmento", describe: "tipo de segmento", type: "string", demandOption: true })
  .example('$0 -f 21 -t 34 -s p', 'lista a linha e campo que from e to do cnab')
  .argv;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const file = path.resolve(`${__dirname}/cnabExample.rem`)

const { from, to, segmento } = optionsYargs

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
