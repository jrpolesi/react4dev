import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'
import { faker } from '@faker-js/faker'

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = 'password'
    const fieldToCompare = 'passwordConfirmation'

    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const field = 'password'
    const fieldToCompare = 'passwordConfirmation'

    const valueToCompare = faker.random.word()

    const sut = makeSut(field, fieldToCompare)

    const error = sut.validate({
      [field]: valueToCompare,
      [fieldToCompare]: valueToCompare
    })
    expect(error).toBeFalsy()
  })
})
