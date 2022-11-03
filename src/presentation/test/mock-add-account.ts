import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/useCases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params?: AddAccountParams
  callsCount = 0

  async add(params: AddAccountParams): Promise<AccountModel | undefined> {
    this.callsCount++
    this.params = params
    return this.account
  }
}
