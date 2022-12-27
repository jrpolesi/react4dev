import { InvalidCredentialsError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages/'
import { AuthenticationSpy, Helper, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()

  validationStub.errorMessage = params?.validationError

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <BrowserRouter>
        <Login validation={validationStub} authentication={authenticationSpy} />
      </BrowserRouter>
    </ApiContext.Provider>
  )

  history.replaceState({}, '', '/login')

  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = (
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const submitButton = screen.getByTestId('submit')
  fireEvent.click(submitButton)
}

describe('Login component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.testChildCount('error-wrap', 0)

    Helper.testButtonIsDisabled('submit', true)

    Helper.testStatusForField('email', validationError)

    Helper.testStatusForField('password', validationError)
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

    Helper.populateField('password')

    Helper.testStatusForField('password', validationError)
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

  test('Should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('email')

    Helper.populateField('password')

    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    simulateValidSubmit()
    await waitFor(() => {
      Helper.testElementExists('spinner')
    })
  })

  test('Should call Authentication with correct values', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { authenticationSpy } = makeSut()

    simulateValidSubmit(email, password)

    await waitFor(() => {
      expect(authenticationSpy.params).toEqual({ email, password })
    })
  })

  test('Should call Authentication only once', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { authenticationSpy } = makeSut()

    simulateValidSubmit(email, password)

    simulateValidSubmit(email, password)

    await waitFor(() => {
      expect(authenticationSpy.callsCount).toBe(1)
    })
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })

    simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError()

    const { authenticationSpy } = makeSut()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValue(Promise.reject(error))

    simulateValidSubmit()

    await waitFor(() => {
      Helper.testElementText('main-error', error.message)
    })

    Helper.testChildCount('error-wrap', 1)
  })

  test('Should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    simulateValidSubmit()

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(
        authenticationSpy.account
      )
    })

    expect(history.length).toBe(1)
    expect(location.pathname).toBe('/')
  })

  test('Should go to sign up page', async () => {
    makeSut()

    const registerLink = screen.getByTestId('signup-link')

    fireEvent.click(registerLink)

    await waitFor(() => {
      expect(history.length).toBe(2)
      expect(location.pathname).toBe('/signup')
    })
  })
})
