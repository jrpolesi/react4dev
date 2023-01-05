import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import SurveyItem from '@/presentation/pages/survey-list/components/item/item'
import { render, screen } from '@testing-library/react'

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />)
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbUp)

    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveAttribute(
      'src',
      IconName.thumbDown
    )

    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
  })
})
