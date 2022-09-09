import { HttpPostParams } from '@/data/protocols/http'
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

const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    accessToken: faker.datatype.uuid()
  }
})

describe('AxiosHttpClient', () => {
  test('Shoull call axios with correct values and verb', async () => {
    const request = mockPostRequest()

    const { sut } = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
