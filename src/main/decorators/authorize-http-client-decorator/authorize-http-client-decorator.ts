import { GetStorage } from '@/data/protocols/cache'
import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'

export class AuthorizeHttpClientDecorator<
  TBodyRequest extends object = {},
  TBodyResponse extends object = {}
> implements HttpClient<TBodyRequest, TBodyResponse>
{
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient
  ) {}

  async request(params: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          ...params.headers,
          'x-access-token': account.accessToken
        }
      })
    }

    return await this.httpClient.request(params)
  }
}
