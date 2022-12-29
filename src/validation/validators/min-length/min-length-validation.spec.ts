import { MinLengthFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5)

describe('RequiredFieldValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = 'field'

    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })
    expect(error).toEqual(new MinLengthFieldError())
  })

  test('Should return falsy if value is valid', () => {
    const field = 'field'

    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut('any_field')

    const error = sut.validate({
      invalidField: faker.random.alphaNumeric(5)
    })
    expect(error).toBeFalsy()
  })
})
