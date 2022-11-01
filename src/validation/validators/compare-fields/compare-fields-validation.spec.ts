import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'
import { faker } from '@faker-js/faker'

const makeSut = (valueToCompare: string): CompareFieldsValidation =>
  new CompareFieldsValidation('password', valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.random.word())

    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})
