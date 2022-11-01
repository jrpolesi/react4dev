import { AddAccountParams } from '@/domain/useCases'
import { faker } from '@faker-js/faker'

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()

  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    passwordConfirmation: password,
    password
  }
}
