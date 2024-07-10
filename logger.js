import chalk from 'chalk'

const log = console.log

export default class Logger {

  #segment
  #segmentType
  #from
  #to

  constructor(segment, segmentType, from, to) {
    this.#segment = segment
    this.#segmentType = segmentType.toUpperCase()
    this.#from = from
    this.#to = to
  }

  log = () => this.#buildMessage()

  #buildMessage = () => `
  ----- ${this.#buildTitle()} -----
  
  ${this.#buildFrom()}
  
  ${this.#buildTo()}
  
  ${this.#buildIsolated()}
  
  ${this.#buildItemInsideFile()}
  
  ----- FIM ------
  `

  #buildTitle = () => `Cnab linha ${this.#segmentType}`

  #buildFrom = () => `posição from:  ${chalk.inverse.bgBlack(this.#from)}`

  #buildTo = () => `posição to: ${chalk.inverse.bgBlack(this.#to)}`

  #buildIsolated = () => `item isolado: ${chalk.inverse.bgBlack(this.#segment.substring(this.#from - 1, this.#to))}`

  #buildItemInsideFile = () => `item dentro da linha ${this.#segmentType}: 
    ${this.#segment.substring(0, this.#from)}${chalk.inverse.bgBlack(this.#segment.substring(this.#from - 1, this.#to))}${this.#segment.substring(this.#to)}`
}
