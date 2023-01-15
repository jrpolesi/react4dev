import { LoadSurveyList } from '@/domain/useCases'
import { atom } from 'recoil'

export type SurveyState = {
  surveys: LoadSurveyList.Model[]
  error: string
  reload: boolean
}

export const surveyListState = atom<SurveyState>({
  key: 'surveyListState',
  default: {
    surveys: [],
    error: '',
    reload: false
  }
})
