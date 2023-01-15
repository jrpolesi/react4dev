import { LoadSurveyResult } from '@/domain/useCases'
import { atom } from 'recoil'

export type SurveyResultState = {
  isLoading: boolean
  error: string
  surveyResult: null | LoadSurveyResult.Model
  reload: boolean
}

export const surveyResultState = atom<SurveyResultState>({
  key: 'surveyResultState',
  default: {
    isLoading: false,
    error: '',
    surveyResult: null,
    reload: false
  }
})

export const onSurveyAnswerState = atom({
  key: 'onSurveyAnswerState',
  default: {
    onAnswer: null as unknown as (answer: string) => void
  }
})
