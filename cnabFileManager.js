export default class CnabFileManager {
  #cnabArray
  #cnabHeader
  #cnabBodySegmentoP
  #cnabBodySegmentoQ
  #cnabBodySegmentoR
  #cnabTail

  constructor(file) {
    this.#cnabArray = file.split('\n')
    this.#cnabHeader = this.#sliceArrayPosition(this.#cnabArray, 0, 2)

    const [cnabBodySegmentoP, cnabBodySegmentoQ, cnabBodySegmentoR] = this.#sliceArrayPosition(this.#cnabArray, 2, -2)
    this.#cnabBodySegmentoP = cnabBodySegmentoP
    this.#cnabBodySegmentoQ = cnabBodySegmentoQ
    this.#cnabBodySegmentoR = cnabBodySegmentoR

    this.#cnabTail = this.#sliceArrayPosition(this.#cnabArray, -2)
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

  #sliceArrayPosition = (arr, ...positions) => [...arr].slice(...positions)
}
