import { LoadSurveyResult } from '@/domain/useCases'
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading
} from '@/presentation/components'
import { useEffect, useState } from 'react'
import FlipMove from 'react-flip-move'
import styles from './survey-result-styles.scss'

type SurveyResultState = {
  isLoading: boolean
  error: string
  surveyResult: null | LoadSurveyResult.Model
}

type Props = {
  loadSurveyResult: LoadSurveyResult
}

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState<SurveyResultState>({
    isLoading: false,
    error: '',
    surveyResult: null
  })

  useEffect(() => {
    loadSurveyResult
      .loadBySurveyId()
      .then(
        (surveyResult) =>
          surveyResult &&
          setState((oldState) => ({ ...oldState, surveyResult }))
      )
      .catch()
  }, [])

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
            <button>Voltar</button>
          </>
        )}
      </div>

      {state.isLoading && <Loading />}
      {state.error && <Error error={state.error} reload={() => {}} />}
      <Footer />
    </div>
  )
}

export default SurveyResult
