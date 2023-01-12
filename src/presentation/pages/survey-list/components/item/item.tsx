import { LoadSurveyList } from '@/domain/useCases'
import { Calendar, Icon, IconName } from '@/presentation/components'
import { Link } from 'react-router-dom'
import styles from './item-styles.scss'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon className={styles.iconWrap} iconName={iconName} />

        <Calendar date={survey.date} className={styles.calendarWrap} />

        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        <Link data-testid="link" to={`/surveys/${survey.id}`}>
          Ver Resultado
        </Link>
      </footer>
    </li>
  )
}

export default SurveyItem
