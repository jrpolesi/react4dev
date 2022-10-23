import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { Authentication, AuthenticationParams } from '@/domain/useCases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {
    this.url = url
    this.httpPostClient = httpPostClient
  }

  async auth(
    authParams: AuthenticationParams
  ): Promise<AccountModel | undefined> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: authParams
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }

    if (httpResponse.body) {
      return httpResponse.body
    }
  }
}
