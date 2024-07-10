import chalk from 'chalk'
import readline from 'readline'

const log = console.log

export default class Logger {

  static log = async (searchResponses) => {
    if (searchResponses.length) {
      for (const row in searchResponses) {
        log(this.#buildMessage(searchResponses[row]))
        await waitForEnter(row, searchResponses.length)
      }
    }
  }

  static #buildMessage = (searchResponse) => {
    const { row, segmentType, from, to, value, segment } = searchResponse
    return `
  ----- ${this.#buildTitle(row, segmentType)} -----
  
  ${this.#buildFrom(from)}
  
  ${this.#buildTo(to)}
  
  ${this.#buildIsolated(value)}
  
  ${this.#buildItemInsideFile(segmentType, segment, from, to)}
  
  ----- FIM ------
  `}

  static #buildTitle = (row, segmentType) => `Cnab linha ${row} tipo: ${segmentType}`

  static #buildFrom = (from) => `posição from:  ${inverseBg(from)}`

  static #buildTo = (to) => `posição to: ${inverseBg(to)}`

  static #buildIsolated = (value) => `item isolado: ${inverseBg(value)}`

  static #buildItemInsideFile = (segmentType, segment, from, to) => `item dentro da linha ${segmentType}: 
    ${segment.substring(0, from - 1)}${inverseBg(segment.substring(from - 1, to - 1))}${segment.substring(to - 1)}`
}

const inverseBg = chalk.inverse.bgBlack

const waitForEnter = (item, total) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log(`Item: ${inverseBg(Number(item) + 1)}/${inverseBg(total)} -  ${inverseBg('Enter/Return')} = Próximo`);

    rl.on('line', () => {
      rl.close();
      resolve();
    });
  });
}
