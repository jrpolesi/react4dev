import { mockHttpRequest } from '@/data/test'
import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios-http-client'
import { mockAxios, mockHttpResponse } from '@/infra/test'
import axios from 'axios'

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

jest.mock('axios')

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()

  const mockedAxios = mockAxios()

  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockHttpRequest()

    const { sut, mockedAxios } = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      method: request.method,
      headers: request.headers
    })
  })

  test('Should return correct response on axios', async () => {
    const request = mockHttpRequest()

    const { sut, mockedAxios } = makeSut()

    const httpResponse = await sut.request(request)

    const mockedAxiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResponse.status,
      body: mockedAxiosResponse.data
    })
  })

  test('Should return correct error on axios', async () => {
    const request = mockHttpRequest()

    const { sut, mockedAxios } = makeSut()

    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const promise = sut.request(request)

    const mockedAxiosPromise = mockedAxios.request.mock.results[0].value

    expect(promise).toEqual(mockedAxiosPromise)
  })

  test("Should return correct error on axios if error don't has a response", async () => {
    const request = mockHttpRequest()

    const { sut, mockedAxios } = makeSut()

    mockedAxios.request.mockRejectedValueOnce({
      response: undefined
    })

    const promise = sut.request(request)

    const mockedAxiosPromise = mockedAxios.request.mock.results[0].value

    expect(promise).toEqual(mockedAxiosPromise)
  })
})
