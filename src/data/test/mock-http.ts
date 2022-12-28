import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: { [faker.random.word()]: faker.random.words() }
})

export class HttpPostClientSpy<
  TBodyRequest extends object,
  TBodyResponse extends object
> implements HttpPostClient<TBodyRequest, TBodyResponse>
{
  url?: string
  body?: TBodyRequest
  response: HttpResponse<TBodyResponse> = {
    statusCode: HttpStatusCode.ok
  }

  async post({
    url,
    body
  }: HttpPostParams<TBodyRequest>): Promise<HttpResponse<TBodyResponse>> {
    this.url = url
    this.body = body
    return await Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<TBodyResponse extends object>
  implements HttpGetClient<TBodyResponse>
{
  url: string = ''
  headers?: any
  response: HttpResponse<TBodyResponse> = {
    statusCode: HttpStatusCode.ok
  }

  async get(params: HttpGetParams): Promise<HttpResponse<TBodyResponse>> {
    this.url = params.url
    this.headers = params.headers

    return await Promise.resolve(this.response)
  }
}
