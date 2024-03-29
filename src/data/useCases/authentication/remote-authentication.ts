import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Authentication } from '@/domain/useCases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<
      Authentication.Params,
      RemoteAuthentication.Model
    >
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  async auth(
    authParams: Authentication.Params
  ): Promise<Authentication.Model | undefined> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
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

export namespace RemoteAuthentication {
  export type Model = Authentication.Model
}
