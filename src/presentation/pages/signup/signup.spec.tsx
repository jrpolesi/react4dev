import { EmailInUseError } from '@/domain/errors'
import { AddAccountSpy } from '@/domain/test'
import { AddAccount } from '@/domain/useCases'
import Signup from '@/presentation/pages/signup/signup'
import { Helper, renderWithHistory, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { fireEvent, screen, waitFor } from '@testing-library/react'

type SutTypes = {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AddAccount.Model) => void
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()

  validationStub.errorMessage = params?.validationError

  const { setCurrentAccountMock } = renderWithHistory({
    Page: () => (
      <Signup validation={validationStub} addAccount={addAccountSpy} />
    )
  })

  history.replaceState({}, '', '/signup')

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (
  name = faker.name.fullName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)

  const submitButton = screen.getByTestId('submit')
  fireEvent.click(submitButton)
}

describe('SignUp component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.word()

    makeSut({ validationError })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)

    expect(screen.getByTestId('submit')).toBeDisabled()

    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.populateField('name')

    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.populateField('email')

    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.populateField('email')

    Helper.testStatusForField('email', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')

    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('name')

    Helper.testStatusForField('name')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('email')

    Helper.testStatusForField('email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('password')

    Helper.testStatusForField('password')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()

    Helper.populateField('passwordConfirmation')

    Helper.testStatusForField('passwordConfirmation')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')

    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    simulateValidSubmit()
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).toBeInTheDocument()
    })
  })

  test('Should call AddAccount with correct values', async () => {
    const name = faker.name.fullName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { addAccountSpy } = makeSut()

    simulateValidSubmit(name, email, password)

    await waitFor(() => {
      expect(addAccountSpy.params).toEqual({
        name,
        email,
        password,
        passwordConfirmation: password
      })
    })
  })

  test('Should call AddAccount only once', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { addAccountSpy } = makeSut()

    simulateValidSubmit(email, password)

    simulateValidSubmit(email, password)

    await waitFor(() => {
      expect(addAccountSpy.callsCount).toBe(1)
    })
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })

    simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const error = new EmailInUseError()

    const { addAccountSpy } = makeSut()

    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)

    simulateValidSubmit()

    await waitFor(() => {
      expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    })

    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    simulateValidSubmit()

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    })

    expect(history.length).toBe(1)
    expect(location.pathname).toBe('/')
  })

  test('Should go to login page', async () => {
    makeSut()

    const loginLink = screen.getByTestId('login-link')

    fireEvent.click(loginLink)

    await waitFor(() => {
      expect(history.length).toBe(2)
      expect(location.pathname).toBe('/login')
    })
  })
})
