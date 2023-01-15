import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { LoadSurveyListSpy } from '@/domain/test'
import SurveyList from '@/presentation/pages/survey-list/survey-list'
import { renderWithHistory } from '@/presentation/test'
import { fireEvent, screen, waitFor } from '@testing-library/react'

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy
  setCurrentAccountMock: (account: AccountModel | undefined) => void
}

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const { setCurrentAccountMock } = renderWithHistory({
    Page: () => <SurveyList loadSurveyList={loadSurveyListSpy} />
  })

  return { loadSurveyListSpy, setCurrentAccountMock }
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

  test('Should render error on UnexpectedError', async () => {
    const error = new UnexpectedError()

    const loadSurveyListSpy = new LoadSurveyListSpy()

    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error)

    makeSut(loadSurveyListSpy)

    await waitFor(() => {
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
    })
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy()

    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock } = makeSut(loadSurveyListSpy)

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(location.pathname).toBe('/login')
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
