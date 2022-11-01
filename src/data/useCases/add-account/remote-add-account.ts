import { HttpPostClient } from '@/data/protocols/http'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountParams } from '@/domain/useCases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async add(params: AddAccountParams): Promise<AccountModel | undefined> {
    await this.httpPostClient.post({ url: this.url, body: params })
    return await Promise.resolve(undefined)
  }
}
