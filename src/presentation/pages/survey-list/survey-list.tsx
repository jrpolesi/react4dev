import { LoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'
import {
  Error,
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

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((state) => ({ ...state, surveys })))
      .catch((error) =>
        setState((state) => ({ ...state, error: error.message }))
      )
  }, [state.reload])

  return (
    <div className={styles.surveyListWrap}>
      <Header />

      <div className={styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>

      <Footer />
    </div>
  )
}

export default SurveyList
