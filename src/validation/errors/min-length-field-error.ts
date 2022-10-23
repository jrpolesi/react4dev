export class MinLengthFieldError extends Error {
  constructor() {
    super(`valor inválido`)
    this.name = 'MinLengthFieldError'
  }
}
