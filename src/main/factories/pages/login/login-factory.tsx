import { RemoteAuthentication } from '@/data/useCases/authentication/remote-authentication'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { Login } from '@/presentation/pages'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builders/validation-builder'
import { ReactElement } from 'react'

const apiURL = 'http://fordevs.herokuapp.com/api/login'

export const makeLogin = (): ReactElement => {
  const axiosHttpClient = new AxiosHttpClient()

  const remoteAuthentication = new RemoteAuthentication(apiURL, axiosHttpClient)

  const validationComposite = ValidationComposite.build([
    ...ValidationBuilder.field('email').required().email().build(),
    ...ValidationBuilder.field('password').required().min(5).build()
  ])

  return (
    <Login
      authentication={remoteAuthentication}
      validation={validationComposite}
    />
  )
}