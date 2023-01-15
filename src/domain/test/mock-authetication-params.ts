import { mockAccountModel } from '@/domain/test'
import { Authentication } from '@/domain/useCases'
import { faker } from '@faker-js/faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationModel = (): Authentication.Model =>
  mockAccountModel()

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params?: Authentication.Params
  callsCount = 0

  async auth(
    params: Authentication.Params
  ): Promise<Authentication.Model | undefined> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
