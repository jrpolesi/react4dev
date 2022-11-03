import { LoginStateProps } from '@/presentation/pages/login/login'
import { createContext, Dispatch, SetStateAction } from 'react'

type FormContext = {
  state: LoginStateProps
  setState: Dispatch<SetStateAction<LoginStateProps>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default createContext<FormContext>({} as FormContext)
