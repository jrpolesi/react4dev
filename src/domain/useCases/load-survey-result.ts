import { SurveyResultModel } from '@/domain/models'

export interface LoadSurveyResult {
  loadBySurveyId: () => Promise<LoadSurveyResult.Model | undefined>
}

export namespace LoadSurveyResult {
  export type Model = SurveyResultModel
}
