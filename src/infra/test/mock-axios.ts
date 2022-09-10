import { faker } from '@faker-js/faker'
import axios from 'axios'

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxiosResult = {
    status: faker.internet.httpStatusCode(),
    data: {
      accessToken: faker.datatype.uuid()
    }
  }

  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockClear().mockResolvedValue(mockedAxiosResult)

  return mockedAxios
}
