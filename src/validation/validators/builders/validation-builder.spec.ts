import { ValidationBuilder as sut } from '@/validation/validators/builders/validation-builder'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'
import { faker } from '@faker-js/faker'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()

    expect(validations).toEqual([new EmailValidation('any_field')])
  })

  test('Should return MinLengthValidation', () => {
    const fieldName = 'any_field'
    const minLength = faker.datatype.number()

    const validations = sut.field(fieldName).min(minLength).build()

    expect(validations).toEqual([new MinLengthValidation(fieldName, minLength)])
  })

  test('Should return a list of validations', () => {
    const fieldName = 'any_field'
    const minLength = faker.datatype.number()

    const validations = sut
      .field(fieldName)
      .required()
      .min(minLength)
      .email()
      .build()

    expect(validations).toEqual([
      new RequiredFieldValidation(fieldName),
      new MinLengthValidation(fieldName, minLength),
      new EmailValidation(fieldName)
    ])
  })
})
