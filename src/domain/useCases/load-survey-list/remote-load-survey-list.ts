import { HttpGetClient } from '@/data/protocols/http'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/useCases/load-survey-list'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {
    this.url = url
    this.httpGetClient = httpGetClient
  }

  async loadAll(): Promise<SurveyModel[]> {
    await this.httpGetClient.get({ url: this.url })
    return '' as any
  }
}
