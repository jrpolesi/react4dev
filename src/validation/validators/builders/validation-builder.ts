import { FieldValidation } from '@/validation/protocols/field-validation'
import { EmailValidation } from '@/validation/validators/email/email-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field/required-field-validation'

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {
    this.fieldName = fieldName
    this.validations = validations
  }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName))
    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}
