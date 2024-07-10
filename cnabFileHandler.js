import Logger from './logger.js'
import CnabFileManager from './cnabFileManager.js'

const handleCnabFile = (yargs) => {
  return file => {
    const { search, value, exportJson } = yargs
    const cnabFileManager = new CnabFileManager(file)

    let searchResults

    if (search === 'empresa') {
      searchResults = cnabFileManager.searchForCompany(value)
    }

    if (search === 'segmento') {
      searchResults = cnabFileManager.searchForSegment(value)
    }

    if (searchResults.length == 0) {
      throw new Error("Segmento não encontrado")
    }

    console.log(searchResults)

    if (exportJson) {
      console.log("exportar json")
    }

  }
}

export default handleCnabFile
