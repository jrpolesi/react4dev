import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { Login } from '@/presentation/pages'
import { ReactElement } from 'react'

const remoteAuthentication = makeRemoteAuthentication()
const validationComposite = makeLoginValidation()
const saveAccessToken = makeLocalSaveAccessToken()

export const makeLogin = (): ReactElement => {
  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
      saveAccessToken={saveAccessToken}
    />
  )
}
