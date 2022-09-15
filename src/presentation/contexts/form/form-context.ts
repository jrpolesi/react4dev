import {
  LoginErrorProps,
  LoginStateProps
} from '@/presentation/pages/login/login'
import { createContext } from 'react'

type LoginContext = {
  state: LoginStateProps
  errorState: LoginErrorProps
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default createContext<LoginContext>({} as LoginContext)
