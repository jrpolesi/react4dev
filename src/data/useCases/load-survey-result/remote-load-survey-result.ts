import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http'
import { AccessDeniedError } from '@/domain/errors'
import { LoadSurveyResult } from '@/domain/useCases'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async loadBySurveyId(): Promise<LoadSurveyResult.Model> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return httpResponse.body!
      default:
        throw new AccessDeniedError()
    }
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string
    date: Date
    answers: Array<{
      image?: string
      answer: string
      count: number
      percent: number
    }>
  }
}
