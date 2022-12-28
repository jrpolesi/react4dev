import { GetStorage } from '@/data/protocols/cache'
import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse
} from '@/data/protocols/http'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(private readonly getStorage: GetStorage) {}

  async get(params: HttpGetParams): Promise<HttpResponse> {
    this.getStorage.get('account')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return await Promise.resolve({} as HttpResponse)
  }
}
