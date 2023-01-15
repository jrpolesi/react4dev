import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/components'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil'

type Params = {
  Page: React.FC
  account?: AccountModel
  states?: Array<{ atom: RecoilState<any>; value: any }>
}

type Result = {
  setCurrentAccountMock: (account: AccountModel | undefined) => void
}

export const renderWithHistory = ({
  Page,
  account = mockAccountModel(),
  states = []
}: Params): Result => {
  const setCurrentAccountMock = jest.fn()

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  const initializeState = ({ set }: MutableSnapshot): void => {
    const allStates = [
      ...states,
      { atom: currentAccountState, value: mockedState }
    ]

    allStates.forEach((state) => set(state.atom, state.value))
  }

  render(
    <BrowserRouter>
      <RecoilRoot initializeState={initializeState}>
        <Page />
      </RecoilRoot>
    </BrowserRouter>
  )

  return {
    setCurrentAccountMock
  }
}
