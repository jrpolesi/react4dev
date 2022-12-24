import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { Login } from '@/presentation/pages'
import { ReactElement } from 'react'

const remoteAuthentication = makeRemoteAuthentication()
const validationComposite = makeLoginValidation()

export const makeLogin = (): ReactElement => {
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}
