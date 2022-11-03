import { makeSignUpValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builders/validation-builder'

describe('SignUpValidationFactory', () => {
  test('Should compose ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()

    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build()
      ])
    )
  })
})
