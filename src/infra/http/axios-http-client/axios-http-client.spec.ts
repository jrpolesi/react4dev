import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { faker } from '@faker-js/faker'
import axios from 'axios'

type SutTypes = {
  sut: AxiosHttpClient
}

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()

  return { sut }
}

describe('AxiosHttpClient', () => {
  test('Shoull call axios with correct URL', async () => {
    const url = faker.internet.url()

    const { sut } = makeSut()

    await sut.post({ url })

    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
