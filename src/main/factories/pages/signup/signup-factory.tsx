import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory'
import { makeLocalUpdateCurrentAccount } from '@/main/factories/usecases/update-current-account/local-update-current-account-factory'
import { Signup } from '@/presentation/pages'
import { ReactElement } from 'react'

const addAccount = makeRemoteAddAccount()
const validationComposite = makeSignUpValidation()
const updateCurrentAccount = makeLocalUpdateCurrentAccount()

export const makeSignUp = (): ReactElement => {
  return (
    <Signup
      addAccount={addAccount}
      validation={validationComposite}
      UpdateCurrentAccount={updateCurrentAccount}
    />
  )
}
