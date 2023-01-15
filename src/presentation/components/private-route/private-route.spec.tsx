import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/components/atoms/atoms'
import PrivateRoute from '@/presentation/components/private-route/private-route'
import { render } from '@testing-library/react'
import 'jest-localstorage-mock'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const makeSut = (account = mockAccountModel()): void => {
  const state = {
    getCurrentAccount: () => account,
    setCurrentAccount: jest.fn()
  }

  render(
    <BrowserRouter>
      <RecoilRoot
        initializeState={({ set }) => set(currentAccountState, state)}
      >
        <Routes>
          <Route index element={<PrivateRoute component={<></>} />} />
        </Routes>
      </RecoilRoot>
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
