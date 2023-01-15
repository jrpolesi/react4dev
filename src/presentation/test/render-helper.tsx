import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/components'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

type Params = {
  Page: React.FC
  account?: AccountModel
}

type Result = {
  setCurrentAccountMock: (account: AccountModel | undefined) => void
}

export const renderWithHistory = ({
  Page,
  account = mockAccountModel()
}: Params): Result => {
  const setCurrentAccountMock = jest.fn()

  const state = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  render(
    <BrowserRouter>
      <RecoilRoot
        initializeState={({ set }) => set(currentAccountState, state)}
      >
        <Page />
      </RecoilRoot>
    </BrowserRouter>
  )

  return {
    setCurrentAccountMock
  }
}
