import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { AddAccount } from '@/domain/useCases'

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      AddAccount.Params,
      RemoteAddAccount.Model
    >
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  async add(params: AddAccount.Params): Promise<AddAccount.Model | undefined> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model
}
