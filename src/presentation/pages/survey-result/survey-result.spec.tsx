import { AccessDeniedError, UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import {
  LoadSurveyResultSpy,
  mockSurveyResultModel,
  SaveSurveyResultSpy
} from '@/domain/test'
import ApiContext from '@/presentation/contexts/api/api-context'
import SurveyResult from '@/presentation/pages/survey-result/survey-result'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

type SutTypes = {
  loadSurveyResultSpy: LoadSurveyResultSpy
  saveSurveyResultSpy: SaveSurveyResultSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

const mockedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy
  saveSurveyResultSpy?: SaveSurveyResultSpy
}

const makeSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy()
}: SutParams = {}): SutTypes => {
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: jest.fn()
      }}
    >
      <BrowserRouter>
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={saveSurveyResultSpy}
        />
      </BrowserRouter>
    </ApiContext.Provider>
  )

  return { loadSurveyResultSpy, saveSurveyResultSpy, setCurrentAccountMock }
}

describe('SurveyResult Component', () => {
  beforeEach(() => {
    mockedNavigate.mockReset()
  })

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
    const loadSurveyResultSpy = new LoadSurveyResultSpy()

    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2020-01-10T00:00:00')
    })
    loadSurveyResultSpy.surveyResult = surveyResult

    makeSut({ loadSurveyResultSpy })

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

  test('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()
    const error = new UnexpectedError()

    jest
      .spyOn(loadSurveyResultSpy, 'loadBySurveyId')
      .mockRejectedValueOnce(error)

    makeSut({ loadSurveyResultSpy })

    await waitFor(() => {
      expect(screen.queryByTestId('question')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()

    jest
      .spyOn(loadSurveyResultSpy, 'loadBySurveyId')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock } = makeSut({ loadSurveyResultSpy })

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(mockedNavigate).toBeCalledWith('/login')
    })
  })

  test('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy()

    jest
      .spyOn(loadSurveyResultSpy, 'loadBySurveyId')
      .mockRejectedValueOnce(new UnexpectedError())

    makeSut({ loadSurveyResultSpy })

    await waitFor(() => fireEvent.click(screen.getByTestId('reload')))

    expect(loadSurveyResultSpy.callsCount).toBe(1)

    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should goto SurveyList on back button click', async () => {
    makeSut()

    await waitFor(() => fireEvent.click(screen.getByTestId('back-button')))

    expect(mockedNavigate).toBeCalledWith(-1)
  })

  test('Should not present loading on active answer click', async () => {
    makeSut()

    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')

      fireEvent.click(answersWrap[0])

      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should call SaveSurveyResult on non active answer click', async () => {
    const { saveSurveyResultSpy, loadSurveyResultSpy } = makeSut()

    await waitFor(() => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')

      fireEvent.click(answersWrap[1])

      expect(screen.queryByTestId('loading')).toBeInTheDocument()

      expect(saveSurveyResultSpy.params).toEqual({
        answer: loadSurveyResultSpy.surveyResult.answers[1].answer
      })
    })
  })

  test('Should render error on UnexpectedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()
    const error = new UnexpectedError()

    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(error)

    makeSut({ saveSurveyResultSpy })

    await waitFor(async () => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
    })

    await waitFor(() => {
      expect(screen.queryByTestId('question')).not.toBeInTheDocument()
      expect(screen.getByTestId('error')).toHaveTextContent(error.message)
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
    })
  })

  test('Should logout on AccessDeniedError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()

    jest
      .spyOn(saveSurveyResultSpy, 'save')
      .mockRejectedValueOnce(new AccessDeniedError())

    const { setCurrentAccountMock } = makeSut({ saveSurveyResultSpy })

    await waitFor(async () => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
    })

    await waitFor(() => {
      expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined)
      expect(mockedNavigate).toBeCalledWith('/login')
    })
  })

  test('Should present SurveyResult data on SaveSurveyResult success', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy()

    const surveyResult = Object.assign(mockSurveyResultModel(), {
      date: new Date('2018-02-20T00:00:00')
    })
    saveSurveyResultSpy.surveyResult = surveyResult

    makeSut({ saveSurveyResultSpy })

    await waitFor(async () => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
    })

    expect(await screen.findByTestId('loading')).toBeInTheDocument()

    expect(await screen.findByTestId('day')).toHaveTextContent('20')
    expect((await screen.findByTestId('month')).textContent).toBe('fev')
    expect(await screen.findByTestId('year')).toHaveTextContent('2018')

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

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })

  test('Should prevent multiple answer click', async () => {
    const { saveSurveyResultSpy } = makeSut()

    await waitFor(async () => {
      const answersWrap = screen.queryAllByTestId('answer-wrap')
      fireEvent.click(answersWrap[1])
      fireEvent.click(answersWrap[1])
    })

    expect(saveSurveyResultSpy.callsCount).toBe(1)
  })
})
