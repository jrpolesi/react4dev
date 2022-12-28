import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import Header from '@/presentation/components/header/header'
import ApiContext from '@/presentation/contexts/api/api-context'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: () => account
      }}
    >
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </ApiContext.Provider>
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
