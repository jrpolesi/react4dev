import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/useCases'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel | null = null

  async save(account: AccountModel): Promise<void> {
    this.account = account
  }
}
