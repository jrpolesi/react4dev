import { RemoteLoadSurveyList } from '@/data/useCases/load-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/useCases'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpClientDecorator<{}, RemoteLoadSurveyList.Model[]>()
  )
}
