import { HttpResponse } from '@/data/protocols/http/http-response'

export type HttpPostParams<TBody extends object = {}> = {
  url: string
  body?: TBody
}

export interface HttpPostClient<
  TBodyRequest extends object = {},
  TBodyResponse extends object = {}
> {
  post(
    params: HttpPostParams<TBodyRequest>
  ): Promise<HttpResponse<TBodyResponse>>
}
