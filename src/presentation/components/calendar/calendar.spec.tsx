import { Calendar } from '@/presentation/components'
import { render, screen } from '@testing-library/react'

const makeSut = (date: Date): void => {
  render(<Calendar date={date} />)
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    makeSut(new Date('2020-01-10T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month').textContent).toBe('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  test('Should render with correct values', () => {
    makeSut(new Date('2019-05-03T00:00:00'))

    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month').textContent).toBe('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
