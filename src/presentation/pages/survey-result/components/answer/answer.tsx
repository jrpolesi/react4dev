import { SurveyResultAnswerModel } from '@/domain/models'
import { SurveyResultContext } from '@/presentation/pages/survey-result/components'
import { useContext } from 'react'
import styles from './answer-styles.scss'

type Props = {
  answer: SurveyResultAnswerModel
}

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyResultContext)

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
