import Logger from './logger.js'
import CnabFileManager from './cnabFileManager.js'
import JsonExporter from './jsonExporter.js'

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
      await JsonExporter.saveJsonFile(searchResponses)
    }

  }
}

export default handleCnabFile
