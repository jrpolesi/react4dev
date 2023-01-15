import { mockAccountModel } from '@/domain/test'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { renderWithHistory } from '@/presentation/test'
import 'jest-localstorage-mock'
import { Route, Routes } from 'react-router-dom'

const makeSut = (account = mockAccountModel()): void => {
  renderWithHistory({
    Page: () => (
      <Routes>
        <Route index element={<PrivateRoute component={<></>} />} />
      </Routes>
    ),
    account
  })
}

describe('PrivateRoute', () => {
  afterEach(() => history.replaceState({}, '', '/'))

  test('Should redirect to /login if token is empty', () => {
    makeSut(null as any)

    expect(location.pathname).toBe('/login')
  })

  test('Should render current component if token is not empty', () => {
    makeSut()

    expect(location.pathname).toBe('/')
  })
})
