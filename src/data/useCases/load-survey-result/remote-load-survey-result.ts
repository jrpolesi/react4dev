import { HttpGetClient } from '@/data/protocols/http'
import { LoadSurveyResult } from '@/domain/useCases'

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>
  ) {}

  async loadBySurveyId(): Promise<LoadSurveyResult.Model> {
    await this.httpGetClient.get({ url: this.url })

    return await Promise.resolve({} as any)
  }
}

export namespace RemoteLoadSurveyResult {
  export type Model = {}
}
