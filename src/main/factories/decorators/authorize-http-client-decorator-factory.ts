import { HttpClient } from '@/data/protocols/http'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeAuthorizeHttpClientDecorator = <
  TBodyRequest extends object = {},
  TBodyResponse extends object = {}
>(): HttpClient<TBodyRequest, TBodyResponse> => {
  return new AuthorizeHttpClientDecorator<TBodyRequest, TBodyResponse>(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  )
}
