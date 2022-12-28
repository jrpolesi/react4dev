import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import SurveyItem from '@/presentation/pages/survey-list/components/survey-item/survey-item'
import { render, screen } from '@testing-library/react'

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = mockSurveyModel()
    survey.didAnswer = true
    survey.date = new Date('2020-01-10T00:00:00')

    render(<SurveyItem survey={survey} />)

    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
