import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class CompareFieldsValidation implements FieldValidation {
  constructor(readonly field: string, private readonly fieldToCompare: string) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate(input: Record<string, any>): Error | null {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null
  }
}
