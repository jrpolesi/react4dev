import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { Authentication, AuthenticationParams } from '@/domain/useCases'

export class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params?: AuthenticationParams
  callsCount = 0

  async auth(params: AuthenticationParams): Promise<AccountModel | undefined> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
