import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/useCases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body ?? []
      case HttpStatusCode.noContent:
        return []
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteLoadSurveyList {
  export type Model = LoadSurveyList.Model
}
