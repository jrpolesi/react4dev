import { MinLengthFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, readonly minLength: number) {
    this.field = field
    this.minLength = minLength
  }

  validate(input: Record<string, any>): Error | null {
    return input[this.field]?.length < this.minLength
      ? new MinLengthFieldError()
      : null
  }
}
