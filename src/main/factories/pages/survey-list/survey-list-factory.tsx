import { makeRemoteLoadSurveyList } from '@/main/factories/usecases'
import { SurveyList } from '@/presentation/pages'
import { ReactElement } from 'react'

const remoteLoadSurveyList = makeRemoteLoadSurveyList()

export const makeSurveyList = (): ReactElement => {
  return <SurveyList loadSurveyList={remoteLoadSurveyList} />
}
