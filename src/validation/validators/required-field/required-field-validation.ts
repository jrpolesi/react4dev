import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {
    this.field = field
  }

  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError()
  }
}
