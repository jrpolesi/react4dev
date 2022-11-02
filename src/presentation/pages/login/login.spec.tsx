import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages/'
import {
  AuthenticationSpy,
  Helper,
  SaveAccessTokenMock,
  ValidationStub
} from '@/presentation/test'
import { faker } from '@faker-js/faker'
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  waitFor
} from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <BrowserRouter>
      <Login
        saveAccessToken={saveAccessTokenMock}
        validation={validationStub}
        authentication={authenticationSpy}
      />
    </BrowserRouter>
  )

  history.replaceState({}, '', '/login')

  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

describe('Login component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)

    Helper.testButtonIsDisabled(sut, 'submit', true)

    Helper.testStatusForField(sut, 'email', validationError)

    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')

    Helper.testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')

    Helper.testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')

    Helper.populateField(sut, 'password')

    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)
    await waitFor(() => {
      Helper.testElementExists(sut, 'spinner')
    })
  })

  test('Should call Authentication with correct values', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut, email, password)

    await waitFor(() => {
      expect(authenticationSpy.params).toEqual({ email, password })
    })
  })

  test('Should call Authentication only once', async () => {
    const email = faker.internet.email()
    const password = faker.internet.password()

    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut, email, password)

    simulateValidSubmit(sut, email, password)

    await waitFor(() => {
      expect(authenticationSpy.callsCount).toBe(1)
    })
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })

    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError()

    const { sut, authenticationSpy } = makeSut()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValue(Promise.reject(error))

    simulateValidSubmit(sut)

    await waitFor(() => {
      testElementText(sut, 'main-error', error.message)
    })

    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut()

    simulateValidSubmit(sut)

    await waitFor(() => {
      expect(saveAccessTokenMock.accessToken).toBe(
        authenticationSpy.account.accessToken
      )
    })

    expect(history.length).toBe(1)
    expect(location.pathname).toBe('/')
  })

  test('Should present error if SaveAccessToken fails', async () => {
    const error = new InvalidCredentialsError()

    const { sut, saveAccessTokenMock } = makeSut()

    jest
      .spyOn(saveAccessTokenMock, 'save')
      .mockReturnValue(Promise.reject(error))

    simulateValidSubmit(sut)

    await waitFor(() => {
      testElementText(sut, 'main-error', error.message)
    })

    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  test('Should go to sign up page', async () => {
    const { sut } = makeSut()

    const register = sut.getByTestId('signup')

    fireEvent.click(register)

    await waitFor(() => {
      expect(history.length).toBe(2)
      expect(location.pathname).toBe('/signup')
    })
  })
})
