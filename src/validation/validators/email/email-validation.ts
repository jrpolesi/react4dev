import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class EmailValidation implements FieldValidation {
  constructor(readonly field: string) {
    this.field = field
  }

  validate(value: string): Error | null {
    return new InvalidFieldError()
  }
}
