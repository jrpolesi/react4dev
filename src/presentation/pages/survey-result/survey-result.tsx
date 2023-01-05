import { Calendar, Footer, Header, Loading } from '@/presentation/components'
import FlipMove from 'react-flip-move'
import styles from './survey-result-styles.scss'

const SurveyResult: React.FC = () => {
  return (
    <div className={styles.surveyResultWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <hgroup>
          <Calendar date={new Date()} className={styles.calendarWrap} />

          <h2>Qual é o seu framework web favorito?</h2>
        </hgroup>

        <FlipMove className={styles.answersList}>
          <li>
            <img
              src="https://nextsoftware.io/files/images/logos/main/reactjs-logo.png"
              alt=""
            />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li className={styles.active}>
            <img
              src="https://nextsoftware.io/files/images/logos/main/reactjs-logo.png"
              alt=""
            />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
          <li>
            <img
              src="https://nextsoftware.io/files/images/logos/main/reactjs-logo.png"
              alt=""
            />
            <span className={styles.answer}>ReactJS</span>
            <span className={styles.percent}>50%</span>
          </li>
        </FlipMove>

        <button>Voltar</button>
      </div>

      {false && <Loading />}
      <Footer />
    </div>
  )
}

export default SurveyResult
