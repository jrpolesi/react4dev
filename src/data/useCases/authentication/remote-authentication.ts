import { HttpPostClient } from '../../protocols'

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(): Promise<void> {
    await this.httpPostClient.post(this.url)

    return await Promise.resolve()
  }
}
