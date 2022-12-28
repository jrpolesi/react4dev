import { AccountModel } from '@/domain/models'
import Header from '@/presentation/components/header/header'
import ApiContext from '@/presentation/contexts/api/api-context'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => void
}

const makeSut = (): SutTypes => {
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
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
})
