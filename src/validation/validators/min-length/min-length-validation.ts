import { MinLengthFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, readonly minLength: number) {
    this.field = field
    this.minLength = minLength
  }

  validate(value: string): Error | null {
    return value.length >= this.minLength ? null : new MinLengthFieldError()
  }
}
