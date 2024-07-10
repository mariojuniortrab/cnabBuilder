import yargs from 'yargs'

export default class YargsAdapter {
  #yargs

  constructor() {
    this.#yargs = yargs(process.argv.slice(2))
      .usage('Uso: $0 [options]')
      .option("search", {
        alias: "s", describe: "Define o que será buscado no arquivo",
        type: "string", demandOption: true, choices: ['empresa', 'segmento']
      })
      .option("value", { alias: "v", describe: "Valor a ser buscado no arquivo", type: "string", demandOption: true })
      .option("path", { alias: "p", describe: "Caminho do arquivo", type: "string" })
      .option("exportJson", { alias: "e", describe: "Exportar para JSON", type: "boolean" })

      .example('$0 -f 21 -t 34 -s p', 'lista a linha e campo que from e to do cnab')
      .locale('pt_BR')
      .argv

  }

  get yargs() {
    return this.#yargs
  }

  get path() {
    return this.#yargs.path
  }
}
