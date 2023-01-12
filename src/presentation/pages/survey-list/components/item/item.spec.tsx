import { mockSurveyModel } from '@/domain/test'
import { IconName } from '@/presentation/components'
import SurveyItem from '@/presentation/pages/survey-list/components/item/item'
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const makeSut = (survey = mockSurveyModel()): void => {
  render(
    <BrowserRouter>
      <SurveyItem survey={survey} />
    </BrowserRouter>
  )
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveAttribute('src', IconName.thumbUp)

    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    })

    makeSut(survey)

    expect(screen.getByTestId('icon')).toHaveAttribute(
      'src',
      IconName.thumbDown
    )

    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)

    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month').textContent).toBe('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })

  test('Should go to SurveyResult', () => {
    const survey = mockSurveyModel()

    makeSut(survey)

    fireEvent.click(screen.getByTestId('link'))

    expect(location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
