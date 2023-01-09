import ApiContext from '@/presentation/contexts/api/api-context'
import SurveyResult from '@/presentation/pages/survey-result/survey-result'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('SurveyResult Component', () => {
  test('Should present correct initial state', () => {
    render(
      <ApiContext.Provider
        value={{
          setCurrentAccount: jest.fn(),
          getCurrentAccount: jest.fn()
        }}
      >
        <BrowserRouter>
          <SurveyResult />
        </BrowserRouter>
      </ApiContext.Provider>
    )

    const surveyList = screen.getByTestId('survey-result')

    expect(surveyList.childElementCount).toBe(0)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
