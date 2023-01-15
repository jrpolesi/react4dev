import { LoadSurveyResult, SaveSurveyResult } from '@/domain/useCases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  SurveyResultContext,
  SurveyResultData
} from '@/presentation/pages/survey-result/components'
import { useEffect, useState } from 'react'
import styles from './survey-result-styles.scss'

type SurveyResultState = {
  isLoading: boolean
  error: string
  surveyResult: null | LoadSurveyResult.Model
  reload: boolean
}

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult
}: Props) => {
  const [state, setState] = useState<SurveyResultState>({
    isLoading: false,
    error: '',
    surveyResult: null,
    reload: false
  })

  const handleError = useErrorHandler((error) =>
    setState((oldState) => ({
      ...oldState,
      surveyResult: null,
      isLoading: false,
      error: error.message
    }))
  )

  useEffect(() => {
    loadSurveyResult
      .loadBySurveyId()
      .then(
        (surveyResult) =>
          surveyResult &&
          setState((oldState) => ({ ...oldState, surveyResult }))
      )
      .catch(handleError)
  }, [state.reload])

  const onAnswer = (answer: string): void => {
    if (state.isLoading) return

    setState((oldState) => ({
      ...oldState,
      surveyResult: null,
      isLoading: true
    }))

    saveSurveyResult
      .save({ answer })
      .then(
        (surveyResult) =>
          surveyResult &&
          setState((oldState) => ({
            ...oldState,
            isLoading: false,
            surveyResult
          }))
      )
      .catch(handleError)
  }

  const reload = (): void => {
    setState((oldState) => ({
      isLoading: false,
      surveyResult: null,
      error: '',
      reload: !oldState.reload
    }))
  }

  return (
    <div className={styles.surveyResultWrap}>
      <Header />
      <SurveyResultContext.Provider value={{ onAnswer }}>
        <div data-testid="survey-result" className={styles.contentWrap}>
          {state.surveyResult && (
            <SurveyResultData surveyResult={state.surveyResult} />
          )}

          {state.isLoading && <Loading />}

          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyResultContext.Provider>
      <Footer />
    </div>
  )
}

export default SurveyResult
