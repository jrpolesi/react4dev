import { ValidationBuilder as sut } from '@/validation/validators/builders/validation-builder'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'

describe('ValidationBuilder', () => {
  test('Should return RequiredFieldValidation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })

  test('Should return EmailValidation', () => {
    const validations = sut.field('any_field').email().build()

    expect(validations).toEqual([new EmailValidation('any_field')])
  })
})
