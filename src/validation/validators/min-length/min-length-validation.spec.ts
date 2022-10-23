import { MinLengthFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { faker } from '@faker-js/faker'

const makeSut = (): MinLengthValidation => new MinLengthValidation('field', 5)

describe('RequiredFieldValidation', () => {
  test('Should return error if value is invalid', () => {
    const sut = makeSut()

    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new MinLengthFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const sut = makeSut()

    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
