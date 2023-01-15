import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import Header from '@/presentation/components/header/header'
import { renderWithHistory } from '@/presentation/test'
import { fireEvent, screen } from '@testing-library/react'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const { setCurrentAccountMock } = renderWithHistory({
    Page: () => <Header />,
    account
  })

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
