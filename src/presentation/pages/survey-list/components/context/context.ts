import { SurveyState } from '@/presentation/pages/survey-list/survey-list'
import { createContext, Dispatch, SetStateAction } from 'react'

type SurveyContext = {
  state: SurveyState
  setState: Dispatch<SetStateAction<SurveyState>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default createContext<SurveyContext>({} as SurveyContext)
