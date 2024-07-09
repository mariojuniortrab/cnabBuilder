import Logger from './logger.js'
import CnabFileManager from './cnabFileManager.js'

const handleCnabFile = (from, to, segment) => {
  return file => {

    const cnabFileManager = new CnabFileManager(file)

    if (segment === 'p') {
      const logger = new Logger(cnabFileManager.cnabBodySegmentoP, segment, from, to)
      logger.log()
      return
    }

    if (segment === 'q') {
      const logger = new Logger(cnabFileManager.cnabBodySegmentoQ, segment, from, to)
      logger.log()
      return
    }

    if (segment === 'r') {
      const logger = new Logger(cnabFileManager.cnabBodySegmentoR, segment, from, to)
      logger.log()
      return
    }

  }
}

export default handleCnabFile
