import { mockGetRequest, mockPostRequest } from '@/data/test'
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
  describe('post', () => {
    test('Should call axios.post with correct values', async () => {
      const request = mockPostRequest()

      const { sut, mockedAxios } = makeSut()

      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response on axios.post', async () => {
      const request = mockPostRequest()

      const { sut, mockedAxios } = makeSut()

      const httpResponse = await sut.post(request)

      const mockedAxiosResponse = await mockedAxios.post.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        body: mockedAxiosResponse.data
      })
    })

    test('Should return correct error on axios.post', async () => {
      const request = mockPostRequest()

      const { sut, mockedAxios } = makeSut()

      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.post(request)

      const mockedAxiosPromise = mockedAxios.post.mock.results[0].value

      expect(promise).toEqual(mockedAxiosPromise)
    })
  })

  test("Should return correct error on axios.post if error don't has a response", async () => {
    const request = mockPostRequest()

    const { sut, mockedAxios } = makeSut()

    mockedAxios.post.mockRejectedValueOnce({
      response: undefined
    })

    const promise = sut.post(request)

    const mockedAxiosPromise = mockedAxios.post.mock.results[0].value

    expect(promise).toEqual(mockedAxiosPromise)
  })

  describe('post', () => {
    test('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()

      const { sut, mockedAxios } = makeSut()

      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })

    test('Should return correct response on axios.get', async () => {
      const request = mockGetRequest()

      const { sut, mockedAxios } = makeSut()

      const httpResponse = await sut.get(request)

      const mockedAxiosResponse = await mockedAxios.get.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        body: mockedAxiosResponse.data
      })
    })

    test('Should return correct error on axios.get', async () => {
      const request = mockGetRequest()

      const { sut, mockedAxios } = makeSut()

      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.get(request)

      const mockedAxiosPromise = mockedAxios.get.mock.results[0].value

      expect(promise).toEqual(mockedAxiosPromise)
    })

    test("Should return correct error on axios.get if error don't has a response", async () => {
      const request = mockGetRequest()

      const { sut, mockedAxios } = makeSut()

      mockedAxios.get.mockRejectedValueOnce({
        response: undefined
      })

      const promise = sut.get(request)

      const mockedAxiosPromise = mockedAxios.get.mock.results[0].value

      expect(promise).toEqual(mockedAxiosPromise)
    })
  })
})
