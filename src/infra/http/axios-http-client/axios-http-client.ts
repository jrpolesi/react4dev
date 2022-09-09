import { HttpPostClient, HttpPostParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<any> {
    await axios.post(params.url)
  }
}
