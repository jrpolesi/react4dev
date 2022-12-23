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
              <div className={[styles.iconWrap, styles.green].join(' ')}>
                <img
                  className={styles.icon}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAFKADAAQAAAABAAAAEgAAAAA9nQVdAAAA0klEQVQ4EWNgIAH8//+/AYhLSNCCWynUMCD1/zcQG+BWSYQMkmEgA0Egjght2JUANYO8iQ4MsasmIAo0BZthP4DirAS0YkrjMAzk0tOYqgmIADUVgnTiADPxakfStAWmECj2DkmcWOYjoEJPRpBqmEGMQABiI4vB5IikH1PbQAYmIm0mVtlLahu4nJpe/gf0hho1XbgVGKd3qWngRFBA4/LyX6AcKZZdBbpOB2QgLk1nQJIkgElwtaBEDAXIOUULKHYSiP/CJHHQX4Hic4CYBWYgADx8PyqFiuhJAAAAAElFTkSuQmCC"
                />
              </div>
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
