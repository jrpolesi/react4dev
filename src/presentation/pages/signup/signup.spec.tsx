import Signup from '@/presentation/pages/signup/signup'
import { Helper } from '@/presentation/test'
import { render, RenderResult } from '@testing-library/react'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<Signup />)

  return {
    sut
  }
}

describe('SignUp component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'

    const { sut } = makeSut()

    Helper.testChildCount(sut, 'error-wrap', 0)

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
