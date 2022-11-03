import { RequiredFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {
    this.field = field
  }

  validate(input: Record<string, any>): Error | null {
    return input[this.field] ? null : new RequiredFieldError()
  }
}
