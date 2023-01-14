import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'
import { faker } from '@faker-js/faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  },
  headers: { [faker.random.word()]: faker.random.words() }
})

export class HttpClientSpy<
  TBodyRequest extends object,
  TBodyResponse extends object
> implements HttpClient<TBodyRequest, TBodyResponse>
{
  url?: string
  method?: string
  body?: TBodyRequest
  headers?: any
  response: HttpResponse<TBodyResponse> = {
    statusCode: HttpStatusCode.ok
  }

  async request({
    url,
    method,
    body,
    headers
  }: HttpRequest<TBodyRequest>): Promise<HttpResponse<TBodyResponse>> {
    this.url = url
    this.method = method
    this.body = body
    this.headers = headers
    return await Promise.resolve(this.response)
  }
}
