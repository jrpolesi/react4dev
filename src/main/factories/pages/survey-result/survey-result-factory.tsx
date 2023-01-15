import {
  makeRemoteLoadSurveyResult,
  makeRemoteSaveSurveyResult
} from '@/main/factories/usecases'
import { SurveyResult } from '@/presentation/pages'
import { ReactElement } from 'react'
import { useParams } from 'react-router-dom'

const SurveyResultScreen: React.FC = () => {
  const { id } = useParams()

  if (!id) {
    return <></>
  }

  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(id)}
      saveSurveyResult={makeRemoteSaveSurveyResult(id)}
    />
  )
}

export const makeSurveyResult = (): ReactElement => {
  return <SurveyResultScreen />
}
