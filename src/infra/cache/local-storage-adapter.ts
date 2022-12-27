import { GetStorage, SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): any {
    const item = localStorage.getItem(key)

    if (item) {
      return JSON.parse(item)
    }
  }
}
