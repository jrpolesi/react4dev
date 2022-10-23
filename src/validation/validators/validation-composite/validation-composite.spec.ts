import { FieldValidationSpy } from '@/validation/validators/test/mock-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite/validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]

  const sut = new ValidationComposite(fieldValidationsSpy)

  return {
    sut,
    fieldValidationsSpy
  }
}

describe('ValidationComposite', () => {
  test('Should return error if any validation fails', () => {
    const { sut, fieldValidationsSpy } = makeSut()

    fieldValidationsSpy[0].error = new Error('first_error_message')

    fieldValidationsSpy[1].error = new Error('second_error_message')

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })

  test('Should return falsy if any validation fails', () => {
    const validationSpy = new FieldValidationSpy('any_field')
    validationSpy.error = new Error('first_error_message')

    const validationSpy2 = new FieldValidationSpy('any_field')
    validationSpy2.error = new Error('second_error_message')

    const sut = new ValidationComposite([validationSpy, validationSpy2])

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
