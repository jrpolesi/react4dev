import { RemoteSaveSurveyResult } from '@/data/useCases'
import { SaveSurveyResult } from '@/domain/useCases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteSaveSurveyResult = (id: string): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator<{}, RemoteSaveSurveyResult.Model>()
  )
}
