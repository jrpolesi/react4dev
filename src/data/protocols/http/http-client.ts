export type HttpRequest<TBody extends object = {}> = {
  url: string
  method: HttpMethod
  headers?: any
  body?: TBody
}

export interface HttpClient<
  TBodyRequest extends object = {},
  TBodyResponse extends object = {}
> {
  request: (
    data: HttpRequest<TBodyRequest>
  ) => Promise<HttpResponse<TBodyResponse>>
}

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<TBody = any> = {
  statusCode: number
  body?: TBody
}
