import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'

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
