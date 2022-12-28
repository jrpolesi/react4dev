import { GetStorage } from '@/data/protocols/cache'
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse
} from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator<T extends object = {}>
  implements HttpGetClient<T>
{
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse> {
    const account = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          ...params.headers,
          'x-access-token': account.accessToken
        }
      })
    }

    return await this.httpGetClient.get(params)
  }
}
