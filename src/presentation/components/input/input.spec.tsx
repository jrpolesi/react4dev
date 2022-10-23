import Input from '@/presentation/components/input/input'
import { render } from '@testing-library/react'
import Context from '@/presentation/contexts/form/form-context'

describe('Input Component', () => {
  test('should begin with readOnly', () => {
    const { getByTestId } = render(
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

    const input = getByTestId('field') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
