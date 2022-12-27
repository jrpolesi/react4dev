import { faker } from '@faker-js/faker'
import { fireEvent, screen } from '@testing-library/react'

export const testStatusForField = (
  fieldName: string,
  validationError?: string
): void => {
  const wrap = screen.getByTestId(`${fieldName}-wrap`)
  const field = screen.getByTestId(fieldName)
  const label = screen.getByTestId(`${fieldName}-label`)

  expect(wrap).toHaveAttribute(
    'data-status',
    validationError ? 'invalid' : 'valid'
  )

  const title = validationError || undefined

  expect(field.title || undefined).toBe(title)
  expect(label.title || undefined).toBe(title)
}

export const populateField = (
  fieldName: string,
  value = faker.random.word()
): void => {
  const input = screen.getByTestId(fieldName)

  fireEvent.input(input, {
    target: { value }
  })
}
