import { LoadSurveyList } from '@/domain/useCases'
import { Error, Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  SurveyListItem,
  surveyListState
} from '@/presentation/pages/survey-list/components'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useRecoilState(surveyListState)

  const handleError = useErrorHandler((error) =>
    setState((oldState) => ({ ...oldState, error: error.message }))
  )

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) =>
        setState((oldState) => ({ ...oldState, error: '', surveys }))
      )
      .catch(handleError)
  }, [state.reload])

  const reload = (): void => {
    setState((oldState) => ({
      surveys: [],
      error: '',
      reload: !oldState.reload
    }))
  }

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>

        {state.error ? (
          <Error error={state.error} reload={reload} />
        ) : (
          <SurveyListItem surveys={state.surveys} />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
