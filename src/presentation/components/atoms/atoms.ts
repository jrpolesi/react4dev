import { AccountModel } from '@/domain/models'
import { atom } from 'recoil'

type CurrentAccountState = {
  setCurrentAccount: (account: AccountModel | undefined) => void
  getCurrentAccount: () => AccountModel
}
export const currentAccountState = atom<CurrentAccountState>({
  key: 'currentAccountState',
  default: {
    setCurrentAccount: null,
    getCurrentAccount: null
  } as unknown as CurrentAccountState
})
