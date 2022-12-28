import { UnexpectedError } from '@/domain/errors'
import { LoadSurveyListSpy } from '@/domain/test'
import SurveyList from '@/presentation/pages/survey-list/survey-list'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <BrowserRouter>
      <SurveyList loadSurveyList={loadSurveyListSpy} />
    </BrowserRouter>
  )

  return { loadSurveyListSpy }
}

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4)
    expect(screen.queryByTestId('error')).not.toBeInTheDocument()

    await waitFor(() => surveyList)
  })

  test('Should call LoadSurveyList', async () => {
    const { loadSurveyListSpy } = makeSut()
    expect(loadSurveyListSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveyItems on success', async () => {
    makeSut()

    const surveyList = screen.getByTestId('survey-list')

    await waitFor(() => {
      expect(surveyList.querySelectorAll('li.surveyItemWrap')).toHaveLength(3)
      expect(screen.queryByTestId('error')).not.toBeInTheDocument()
    })
  })

  test('Should render error on failure', async () => {
    const error = new UnexpectedError()

    const loadSurveyListSpy = new LoadSurveyListSpy()

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

    makeSut(loadSurveyListSpy)

    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
  })

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError())

    makeSut(loadSurveyListSpy)

    await waitFor(() => fireEvent.click(screen.getByTestId('reload')))

    expect(loadSurveyListSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })
})
