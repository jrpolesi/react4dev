import styles from './survey-item-empty.scss'

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
      <li className={styles.surveyItemEmpty} />
    </>
  )
}

export default SurveyItemEmpty
