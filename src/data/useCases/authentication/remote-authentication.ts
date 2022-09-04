import {
  Authentication,
  AuthenticationParams
} from '../../../domain/useCases/authentication'
import { HttpPostClient } from '../../protocols/http/http-post-client'

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
