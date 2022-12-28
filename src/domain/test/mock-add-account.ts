import { mockAccountModel } from '@/domain/test'
import { AddAccount } from '@/domain/useCases'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    passwordConfirmation: password,
    password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params?: AddAccount.Params
  callsCount = 0

  async add(params: AddAccount.Params): Promise<AddAccount.Model | undefined> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
