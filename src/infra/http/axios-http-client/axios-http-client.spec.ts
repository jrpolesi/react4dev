import { HttpPostParams } from '@/data/protocols/http'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { faker } from '@faker-js/faker'
import axios from 'axios'

type SutTypes = {
  sut: AxiosHttpClient
}

const mockedAxiosResult = {
  status: faker.internet.httpStatusCode(),
  data: {
    accessToken: faker.datatype.uuid()
  }
}

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.post.mockResolvedValue(mockedAxiosResult)

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()

  return { sut }
}

const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values and verb', async () => {
    const request = mockPostRequest()

    const { sut } = makeSut()

    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', async () => {
    const request = mockPostRequest()

    const { sut } = makeSut()

    const httpResponse = await sut.post(request)

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})
