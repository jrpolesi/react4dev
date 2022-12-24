import { AccountModel } from '@/domain/models'
import { createContext } from 'react'

type Props = {
  setCurrentAccount?: (account: AccountModel) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default createContext<Props>({} as Props)
