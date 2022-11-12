export class MinLengthFieldError extends Error {
  constructor() {
    super(`Valor inválido`)
    this.name = 'MinLengthFieldError'
  }
}
