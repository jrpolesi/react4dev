import { Footer, Logo } from '@/presentation/components'
import styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={styles.surveyListWrap}>
      <header className={styles.headerWrap}>
        <div className={styles.headerContent}>
          <Logo />

          <div className={styles.logoutWrap}>
            <span>Rodrigo</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>

        <ul>
          <li>
            <div className={styles.surveyContent}>
              <time>
                <span className={styles.day}>22</span>
                <span className={styles.month}>03</span>
                <span className={styles.year}>2020</span>
              </time>

              <p>Qual o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
