import { RemoteLoadSurveyList } from '@/data/useCases/load-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/useCases'
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrl('/surveys'),
    makeAuthorizeHttpGetClientDecorator<RemoteLoadSurveyList.Model[]>()
  )
}
