import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import { Signup } from '@/presentation/pages'
import { ReactElement } from 'react'

const addAccount = makeRemoteAddAccount()
const validationComposite = makeSignUpValidation()
const saveAccessToken = makeLocalSaveAccessToken()

export const makeSignUp = (): ReactElement => {
  return (
    <Signup
      addAccount={addAccount}
      validation={validationComposite}
      saveAccessToken={saveAccessToken}
    />
  )
}
