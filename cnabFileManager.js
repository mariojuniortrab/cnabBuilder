import SearchResponse from './searchResponse.js'


const COMPANY_FROM = 33
const COMPANY_TO = 72
const ADDRESS_FROM = 73
const ADDRESS_TO = 153
export default class CnabFileManager {
  cnabArray
  #cnabHeader
  #cnabBodySegmentoP = []
  #cnabBodySegmentoQ = []
  #cnabBodySegmentoR = []
  #cnabTail

  constructor(file) {
    const cnabArray = file.split('\n')
    this.#cnabHeader = this.#sliceArrayPosition(cnabArray, 0, 2)
    this.#cnabTail = this.#sliceArrayPosition(cnabArray, -2)

    const cnabContent = this.#sliceArrayPosition(cnabArray, 2, -2)

    if (cnabContent.length % 3 !== 0) {
      throw new Error("Arquivo inválido. A quantidade de segmentos Q, P e R precisa ser a mesma!")
    }

    for (let i = 0; i < cnabContent.length; i = i + 3) {
      this.#cnabBodySegmentoP.push(cnabContent[i])
      this.#cnabBodySegmentoQ.push(cnabContent[i + 1])
      this.#cnabBodySegmentoR.push(cnabContent[i + 2])
    }
  }

  get cnabHeader() {
    return this.#cnabHeader
  }

  get cnabBodySegmentoP() {
    return this.#cnabBodySegmentoP
  }

  get cnabBodySegmentoQ() {
    return this.#cnabBodySegmentoQ
  }

  get cnabBodySegmentoR() {
    return this.#cnabBodySegmentoR
  }

  get cnabTail() {
    return this.#cnabTail
  }

  searchForCompany = value => {
    value = value.toUpperCase()
    const found = []

    for (const row in this.#cnabBodySegmentoQ) {
      const companyName = this.#cnabBodySegmentoQ[row].substring(COMPANY_FROM, COMPANY_TO).trim()
      const address = this.#cnabBodySegmentoQ[row].substring(ADDRESS_FROM, ADDRESS_TO).trim()
      const pos = companyName.search(value)

      if (pos !== -1) {
        const fileRow = ((row * 3) + 4)
        found.push(new SearchResponse(companyName, companyName, fileRow, COMPANY_FROM + 1, "Q", this.#cnabBodySegmentoQ[row], address))
      }
    }

    return found
  }

  searchForSegment = value => {
    value = value.toUpperCase()
    const found = []

    for (const row in this.#cnabBodySegmentoQ) {
      let pos = this.#cnabBodySegmentoQ[row].search(value)

      if (pos !== -1) {
        const companyName = this.#cnabBodySegmentoQ[row].substring(COMPANY_FROM, COMPANY_TO).trim()
        const address = this.#cnabBodySegmentoQ[row].substring(ADDRESS_FROM, ADDRESS_TO).trim()
        const fileRow = ((row * 3) + 4)
        found.push(new SearchResponse(companyName, value, fileRow, pos + 1, "Q", this.#cnabBodySegmentoQ[row], address))
      }

      pos = this.#cnabBodySegmentoP[row].search(value)

      if (pos !== -1) {
        const companyName = this.#cnabBodySegmentoQ[row].substring(COMPANY_FROM, COMPANY_TO).trim()
        const address = this.#cnabBodySegmentoQ[row].substring(ADDRESS_FROM, ADDRESS_TO).trim()
        const fileRow = ((row * 3) + 3)
        found.push(new SearchResponse(companyName, value, fileRow, pos + 1, "P", this.#cnabBodySegmentoP[row], address))
      }

      pos = this.#cnabBodySegmentoR[row].search(value)

      if (pos !== -1) {
        const companyName = this.#cnabBodySegmentoQ[row].substring(COMPANY_FROM, COMPANY_TO).trim()
        const address = this.#cnabBodySegmentoQ[row].substring(ADDRESS_FROM, ADDRESS_TO).trim()
        const fileRow = ((row * 3) + 5)
        found.push(new SearchResponse(companyName, value, fileRow, pos + 1, "R", this.#cnabBodySegmentoR[row], address))
      }
    }

    return found
  }

  #sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions)
}
