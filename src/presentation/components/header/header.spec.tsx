import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/components/atoms/atoms'
import Header from '@/presentation/components/header/header'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()

  const state = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  render(
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </RecoilRoot>
  )

  return {
    setCurrentAccountMock
  }
}

describe('Header Componente', () => {
  test('Should call setCurrentAccount with null', () => {
    const { setCurrentAccountMock } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
    expect(location.pathname).toBe('/login')
  })

  test('Should render username correctly', () => {
    const account = mockAccountModel()

    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
