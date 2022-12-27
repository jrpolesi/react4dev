import { AccountModel } from '@/domain/models'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage.setItem with correct values', () => {
    const sut = makeSut()

    const key = faker.database.column()
    const value: AccountModel = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.fullName()
    }

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })

  test('Should call localStorage.getItem with correct value', () => {
    const sut = makeSut()

    const key = faker.database.column()
    const value: AccountModel = {
      accessToken: faker.datatype.uuid(),
      name: faker.name.fullName()
    }

    const getItemSpy = jest.spyOn(localStorage, 'getItem') as jest.SpyInstance<
      string | null
    >

    getItemSpy.mockReturnValueOnce(JSON.stringify(value))

    const obj = sut.get(key)

    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
