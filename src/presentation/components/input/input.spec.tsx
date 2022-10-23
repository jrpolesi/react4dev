import Input from '@/presentation/components/input/input'
import { render, RenderResult } from '@testing-library/react'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider
      value={
        {
          state: {}
        } as any
      }
    >
      <Input name="field" />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const { getByTestId } = makeSut()

    const input = getByTestId('field') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
