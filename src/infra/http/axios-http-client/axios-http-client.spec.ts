import { mockPostRequest } from '@/data/test'
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

      const httpResponse = await sut.post(request)

      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const mockedAxiosResponse = await mockedAxios.post.mock.results[0].value

      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResponse.status,
        body: mockedAxiosResponse.data
      })
    })
  })
})
