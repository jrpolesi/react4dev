import {
  SurveyContext,
  SurveyItem,
  SurveyItemEmpty
} from '@/presentation/pages/survey-list/components'
import { useContext } from 'react'
import styles from './list-styles.scss'

const List: React.FC = () => {
  const { state } = useContext(SurveyContext)

  return (
    <ul className={styles.listWrap} data-testid="survey-list">
      {state.surveys.length ? (
        state.surveys.map((survey) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  )
}

export default List
