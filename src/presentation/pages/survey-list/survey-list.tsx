import { LoadSurveyList } from '@/domain/useCases'
import { Error, Footer, Header } from '@/presentation/components'
import { useErrorHandler } from '@/presentation/hooks'
import {
  SurveyContext,
  SurveyListItem
} from '@/presentation/pages/survey-list/components'
import { useEffect, useState } from 'react'
import styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

export type SurveyState = {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState<SurveyState>({
    surveys: [],
    error: '',
    reload: false
  })

  const handleError = useErrorHandler((error) =>
    setState((oldState) => ({ ...oldState, error: error.message }))
  )

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((oldState) => ({ ...oldState, surveys })))
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
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? (
            <Error error={state.error} reload={reload} />
          ) : (
            <SurveyListItem />
          )}
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
