import { makeRemoteLoadSurveyResult } from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'
import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export const makeSurveyResult = (): ReactElement => {
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return <></>
  }

  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult(id)} />
}
