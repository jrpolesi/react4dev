import { RemoteLoadSurveyResult } from '@/data/useCases'
import { LoadSurveyResult } from '@/domain/useCases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteLoadSurveyResult = (id: string): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${id}/results`),
    makeAuthorizeHttpClientDecorator<{}, RemoteLoadSurveyResult.Model>()
  )
}
