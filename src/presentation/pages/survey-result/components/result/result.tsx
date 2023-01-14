import { LoadSurveyResult } from '@/domain/useCases'
import { Calendar } from '@/presentation/components'
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components'
import FlipMove from 'react-flip-move'
import { useNavigate } from 'react-router-dom'
import styles from './result-styles.scss'

type Props = {
  surveyResult: LoadSurveyResult.Model
}

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} />

        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <FlipMove data-testid="answers" className={styles.answersList}>
        <>
          {surveyResult.answers.map((answer) => (
            <SurveyResultAnswer key={answer.answer} answer={answer} />
          ))}
        </>
      </FlipMove>

      <button
        className={styles.button}
        data-testid="back-button"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </>
  )
}

export default Result
