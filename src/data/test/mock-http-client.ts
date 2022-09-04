import {
  HttpPostClient,
  HttpPostParams
} from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string

  async post({ url }: HttpPostParams): Promise<void> {
    this.url = url
    return await Promise.resolve()
  }
}
