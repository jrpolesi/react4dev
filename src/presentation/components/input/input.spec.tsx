import Input from '@/presentation/components/input/input'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import Context from '@/presentation/contexts/form/form-context'
import { faker } from '@faker-js/faker'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <Context.Provider
      value={
        {
          state: {}
        } as any
      }
    >
      <Input name={fieldName} />
    </Context.Provider>
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
