import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder } from '@/validation/validators/builders/validation-builder'

describe('LoginValidationFactory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field('email').required().email().build(),
        ...ValidationBuilder.field('password').required().min(5).build()
      ])
    )
  })
})
