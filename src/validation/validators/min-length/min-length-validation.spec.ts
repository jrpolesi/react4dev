import { MinLengthFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'

describe('RequiredFieldValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = new MinLengthValidation('field', 5)

    const error = sut.validate('123')
    expect(error).toEqual(new MinLengthFieldError())
  })
})
