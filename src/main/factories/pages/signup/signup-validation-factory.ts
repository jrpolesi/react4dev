import {
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/validation/validators'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new EmailValidation('email'),
    new RequiredFieldValidation('password'),
    new MinLengthValidation('password', 5),
    new RequiredFieldValidation('passwordConfirmation'),
    new CompareFieldsValidation('passwordConfirmation', 'password')
  ])
}
