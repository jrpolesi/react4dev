import { HttpPostClient } from '@/data/protocols/http/http-post-client'
import {
  Authentication,
  AuthenticationParams
} from '@/domain/useCases/authentication'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(authParams: AuthenticationParams): Promise<any> {
    await this.httpPostClient.post({ url: this.url, body: authParams })

    return await Promise.resolve()
  }
}
