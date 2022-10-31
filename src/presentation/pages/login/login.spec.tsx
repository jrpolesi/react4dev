import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages/'
import {
  AuthenticationSpy,
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

type FormFields = 'email' | 'password'

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

const populateEmailField = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email')

  fireEvent.input(emailInput, {
    target: { value: email }
  })
}

const populatePasswordField = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password')

  fireEvent.input(passwordInput, {
    target: { value: password }
  })
}

const simulateValidSubmit = (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): void => {
  populateEmailField(sut, email)

  populatePasswordField(sut, password)

  const submitButton = sut.getByTestId('submit') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const testStatusForField = (
  sut: RenderResult,
  fieldName: FormFields,
  validationError?: string
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)

  expect(fieldStatus.title).toBe(validationError ?? 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap')

  expect(errorWrap.childElementCount).toBe(count)
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const element = sut.getByTestId(fieldName)

  expect(element).toBeTruthy()
}

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const element = sut.getByTestId(fieldName)
  expect(element.textContent).toBe(text)
}

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement

  expect(button.disabled).toBe(isDisabled)
}

describe('Login component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    testErrorWrapChildCount(sut, 0)

    testButtonIsDisabled(sut, 'submit', true)

    testStatusForField(sut, 'email', validationError)

    testStatusForField(sut, 'password', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    populateEmailField(sut)

    testStatusForField(sut, 'email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)

    testStatusForField(sut, 'password', validationError)
  })

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    testStatusForField(sut, 'email')
  })

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)

    testStatusForField(sut, 'password')
  })

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)

    populatePasswordField(sut)

    testButtonIsDisabled(sut, 'submit', false)
  })

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut()

    simulateValidSubmit(sut)
    await waitFor(() => {
      testElementExists(sut, 'spinner')
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

    testErrorWrapChildCount(sut, 1)
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

    testErrorWrapChildCount(sut, 1)
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
