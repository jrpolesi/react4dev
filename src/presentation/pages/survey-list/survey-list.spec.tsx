import SurveyList from '@/presentation/pages/survey-list/survey-list'
import { render, screen } from '@testing-library/react'

const makeSut = (): void => {
  render(<SurveyList />)
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty').length).toBe(4)
  })
})
