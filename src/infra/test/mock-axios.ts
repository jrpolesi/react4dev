import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockHttpResponse = (): any => ({
  status: faker.internet.httpStatusCode(),
  data: {
    accessToken: faker.datatype.uuid()
  }
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxiosResult = mockHttpResponse()

  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.request.mockClear().mockResolvedValue(mockedAxiosResult)

  return mockedAxios
}
