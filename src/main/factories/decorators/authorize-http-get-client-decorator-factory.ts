import { HttpGetClient } from '@/data/protocols/http'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeAuthorizeHttpGetClientDecorator = <
  T extends object
>(): HttpGetClient<T> => {
  return new AuthorizeHttpGetClientDecorator<T>(
    makeLocalStorageAdapter(),
    makeAxiosHttpClient()
  )
}
