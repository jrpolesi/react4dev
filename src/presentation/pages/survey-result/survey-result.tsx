import { LoadSurveyResult } from '@/domain/useCases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { SurveyResultData } from '@/presentation/pages/survey-result/components'
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
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
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

      <div data-testid="survey-result" className={styles.contentWrap}>
        {state.surveyResult && (
          <SurveyResultData surveyResult={state.surveyResult} />
        )}

        {state.isLoading && <Loading />}

        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}

export default SurveyResult
