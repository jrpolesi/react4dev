import { Icon, IconName } from '@/presentation/components'
import styles from './survey-item-styles.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon className={styles.iconWrap} iconName={IconName.thumbDown} />

        <time>
          <span className={styles.day}>22</span>
          <span className={styles.month}>03</span>
          <span className={styles.year}>2020</span>
        </time>

        <p>Qual o seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem
