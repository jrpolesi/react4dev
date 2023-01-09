import { LoadSurveyList } from '@/domain/useCases'
import {
  SurveyItem,
  SurveyItemEmpty
} from '@/presentation/pages/survey-list/components'
import styles from './list-styles.scss'

type Props = {
  surveys: LoadSurveyList.Model[]
}

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {surveys.length ? (
        surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  )
}

export default List
