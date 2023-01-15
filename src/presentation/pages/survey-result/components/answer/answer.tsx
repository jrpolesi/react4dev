import { SurveyResultAnswerModel } from '@/domain/models'
import { onSurveyAnswerState } from '@/presentation/pages/survey-result/components'
import { useRecoilValue } from 'recoil'
import styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useRecoilValue(onSurveyAnswerState)

  const activeClassName = answer.isCurrentAccountAnswer ? styles.active : ''

  const answerClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    if (event.currentTarget.classList.contains(styles.active)) {
      return
    }

    onAnswer(answer.answer)
  }

  return (
    <li
      data-testid="answer-wrap"
      className={[styles.answerWrap, activeClassName].join(' ')}
      onClick={answerClick}
    >
      {answer.image && (
        <img data-testid="image" src={answer.image} alt={answer.answer} />
      )}
      <span data-testid="answer" className={styles.answer}>
        {answer.answer}
      </span>
      <span data-testid="percent" className={styles.percent}>
        {answer.percent}%
      </span>
    </li>
  )
}

export default Answer
