import { LoadSurveyResultSpy, mockSurveyResultModel } from '@/domain/test'
import ApiContext from '@/presentation/contexts/api/api-context'
import SurveyResult from '@/presentation/pages/survey-result/survey-result'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
}

const makeSut = (surveyResult = mockSurveyResultModel()): SutTypes => {
  const loadSurveyResultSpy = new LoadSurveyResultSpy()

  loadSurveyResultSpy.surveyResult = surveyResult

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: jest.fn(),
        getCurrentAccount: jest.fn()
      }}
    >
      <BrowserRouter>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </BrowserRouter>
    </ApiContext.Provider>
  )

  return { loadSurveyResultSpy }
}

describe('SurveyResult Component', () => {
  test('Should present correct initial state', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-result')

    expect(surveyList.childElementCount).toBe(0)

    await waitFor(() => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = makeSut()

    await waitFor(() => expect(loadSurveyResultSpy.callsCount).toBe(1))
  })

  test('Should present SurveyResult data on success', async () => {
    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00')
    })

    makeSut(surveyResult)

    expect(await screen.findByTestId('day')).toHaveTextContent('10')
    expect((await screen.findByTestId('month')).textContent).toBe('jan')
    expect(await screen.findByTestId('year')).toHaveTextContent('2020')

    expect(await screen.findByTestId('question')).toHaveTextContent(
      surveyResult.question
    )

    expect((await screen.findByTestId('answers')).childElementCount).toBe(2)

    const answersWrap = screen.queryAllByTestId('answer-wrap')

    expect(answersWrap[0]).toHaveClass('active')
    expect(answersWrap[1]).not.toHaveClass('active')

    const images = screen.queryAllByTestId('image')

    expect(images[0]).toHaveAttribute('src', surveyResult.answers[0].image)
    expect(images[0]).toHaveAttribute('alt', surveyResult.answers[0].answer)

    expect(images[1]).toBeFalsy()

    const answers = screen.queryAllByTestId('answer')

    expect(answers[0]).toHaveTextContent(surveyResult.answers[0].answer)
    expect(answers[1]).toHaveTextContent(surveyResult.answers[1].answer)

    const percents = screen.queryAllByTestId('percent')

    expect(percents[0]).toHaveTextContent(`${surveyResult.answers[0].percent}%`)
    expect(percents[1]).toHaveTextContent(`${surveyResult.answers[1].percent}%`)
  })
})
