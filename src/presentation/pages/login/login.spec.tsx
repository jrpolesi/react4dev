import Login from '@/presentation/pages/login/login'
import { render } from '@testing-library/react'

describe('Login component', () => {
  test('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const errorWrap = getByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(true)
  })
})
