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

      .example([
        ['$0 -s empresa -v "DO BRASIL" -e  ', 'lista as linhas onde as empresas possuem "DO BRASIL" em seu nome'],
        ['$0 -s segmento -v 70000172 -e ', 'lista as linhas que possuem o valor "70000172" em seu conteudo'],
        ['$0 -s empresa -v mario -e -p /Users/mariojunior/Documents/backup/cnabExample.rem   ', 'lista as linhas onde as empresas possuem "MARIO" em seu nome no arquivo especificado'],
      ])
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
