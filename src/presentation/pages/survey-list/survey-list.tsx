import { AccessDeniedError } from '@/domain/errors'
import { LoadSurveyList } from '@/domain/useCases'
import { Footer, Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'
import {
  Error,
  SurveyContext,
  SurveyListItem
} from '@/presentation/pages/survey-list/components'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  const { setCurrentAccount } = useContext(ApiContext)

  const [state, setState] = useState<SurveyState>({
    surveys: [],
    error: '',
    reload: false
  })

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState((state) => ({ ...state, surveys })))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount?.(undefined)
          navigate('/login')
        } else {
          setState((state) => ({ ...state, error: error.message }))
        }
      })
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
