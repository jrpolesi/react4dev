import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): RequiredFieldValidation =>
  new RequiredFieldValidation(field)

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = 'email'

    const sut = makeSut(field)

    const error = sut.validate({ [field]: '' })
    expect(error).toEqual(new RequiredFieldError())
  })

  test('Should return falsy if field is not empty', () => {
    const field = 'email'

    const sut = makeSut(field)

    const error = sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
