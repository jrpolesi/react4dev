import { HttpResponse } from '@/data/protocols/http/http-response'

export type HttpGetParams = {
  url: string
}

export interface HttpGetClient<TBodyResponse extends object = {}> {
  get: (params: HttpGetParams) => Promise<HttpResponse<TBodyResponse>>
}
