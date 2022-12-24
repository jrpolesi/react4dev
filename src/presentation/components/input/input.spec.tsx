import Input from '@/presentation/components/input/input'
import { FormContext } from '@/presentation/contexts'
import { faker } from '@faker-js/faker'
import { fireEvent, render, RenderResult } from '@testing-library/react'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContext.Provider
      value={
        {
          state: {}
        } as any
      }
    >
      <Input name={fieldName} />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const fieldName = faker.random.word()
    const { getByTestId } = makeSut(fieldName)

    const input = getByTestId(fieldName) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  test('should remove readOnly on focus', () => {
    const fieldName = faker.random.word()
    const { getByTestId } = makeSut(fieldName)

    const input = getByTestId(fieldName) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })
})
