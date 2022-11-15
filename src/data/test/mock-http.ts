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

export class HttpGetClientSpy implements HttpGetClient {
  url: string = ''

  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url
    return await Promise.resolve()
  }
}
