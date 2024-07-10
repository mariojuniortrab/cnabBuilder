import Logger from './logger.js'
import CnabFileManager from './cnabFileManager.js'

const handleCnabFile = async (yargs) => {
  return async file => {
    const { search, value, exportJson } = yargs
    const cnabFileManager = new CnabFileManager(file)

    let searchResponses

    if (search === 'empresa') {
      searchResponses = cnabFileManager.searchForCompany(value)
    }

    if (search === 'segmento') {
      searchResponses = cnabFileManager.searchForSegment(value)
    }

    if (searchResponses.length == 0) {
      throw new Error("Segmento não encontrado")
    }

    await Logger.log(searchResponses)

    if (exportJson) {
      console.log("exportar json")
    }

  }
}

export default handleCnabFile
