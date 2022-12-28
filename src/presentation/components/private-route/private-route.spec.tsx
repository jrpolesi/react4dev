import { mockAccountModel } from '@/domain/test'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { ApiContext } from '@/presentation/contexts'
import { render } from '@testing-library/react'
import 'jest-localstorage-mock'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const makeSut = (account = mockAccountModel()): void => {
  render(
    <BrowserRouter>
      <ApiContext.Provider
        value={{
          getCurrentAccount: () => account
        }}
      >
        <Routes>
          <Route index element={<PrivateRoute component={<></>} />} />
        </Routes>
      </ApiContext.Provider>
    </BrowserRouter>
  )
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
