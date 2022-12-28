import { RemoteLoadSurveyList } from '@/data/useCases/load-survey-list/remote-load-survey-list'
import { LoadSurveyList } from '@/domain/useCases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
}
