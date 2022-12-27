import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '@/main/adapters/current-account-adapter'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const account = mockAccountModel()

    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

    setCurrentAccountAdapter(account)

    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  test('Should throw UnexpectedError', () => {
    expect(() => {
      setCurrentAccountAdapter(undefined as unknown as AccountModel)
    }).toThrow(new UnexpectedError())
  })

  test('Should call LocalStorageAdapter.get with correct values', () => {
    const account = mockAccountModel()

    const getSpy = jest
      .spyOn(LocalStorageAdapter.prototype, 'get')
      .mockReturnValueOnce(account)

    const result = getCurrentAccountAdapter()

    expect(getSpy).toHaveBeenCalledWith('account')
    expect(result).toEqual(account)
  })
})
