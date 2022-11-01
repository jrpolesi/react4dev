import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly valueToCompare: string) {
    this.field = field
    this.valueToCompare = valueToCompare
  }

  validate(value: string): Error | null {
    return value !== this.valueToCompare ? new InvalidFieldError() : null
  }
}
