import { LoadSurveyResult, SaveSurveyResult } from '@/domain/useCases'
import { Error, Footer, Header, Loading } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  onSurveyAnswerState,
  SurveyResultData,
  surveyResultState
} from '@/presentation/pages/survey-result/components'
import { useEffect } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import styles from './survey-result-styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult
}: Props) => {
  const [state, setState] = useRecoilState(surveyResultState)

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

  const setOnAnswer = useSetRecoilState(onSurveyAnswerState)

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

  useEffect(() => setOnAnswer({ onAnswer }), [])

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
