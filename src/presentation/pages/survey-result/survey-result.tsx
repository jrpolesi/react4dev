import { LoadSurveyResult } from '@/domain/useCases'
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading
} from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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
          <>
            <hgroup>
              <Calendar date={state.surveyResult.date} />

              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <FlipMove data-testid="answers" className={styles.answersList}>
              {state.surveyResult.answers.map((answer) => (
                <li
                  data-testid="answer-wrap"
                  key={answer.answer}
                  className={answer.isCurrentAccountAnswer ? styles.active : ''}
                >
                  {answer.image && (
                    <img
                      data-testid="image"
                      src={answer.image}
                      alt={answer.answer}
                    />
                  )}
                  <span data-testid="answer" className={styles.answer}>
                    {answer.answer}
                  </span>
                  <span data-testid="percent" className={styles.percent}>
                    {answer.percent}%
                  </span>
                </li>
              ))}
            </FlipMove>

            <button data-testid="back-button" onClick={() => navigate(-1)}>
              Voltar
            </button>
          </>
        )}
      </div>

      {state.isLoading && <Loading />}
      {state.error && <Error error={state.error} reload={reload} />}
      <Footer />
    </div>
  )
}

export default SurveyResult
