import { RemoteSurveyResultModel } from '@/data/models'
import { HttpClient } from '@/data/protocols/http'
import { SaveSurveyResult } from '@/domain/useCases'

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<{}, RemoteSaveSurveyResult.Model>
  ) {}

  async save(
    params: SaveSurveyResult.Params
  ): Promise<SaveSurveyResult.Model | undefined> {
    await this.httpClient.request({
      url: this.url,
      method: 'put'
    })

    return undefined
  }
}

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel
}