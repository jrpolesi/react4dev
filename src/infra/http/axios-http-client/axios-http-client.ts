import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      if (!error.response) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        axiosResponse = {
          status: 500,
          data: undefined
        } as AxiosResponse
      } else {
        axiosResponse = error.response
      }
    }

    return this.adapt(axiosResponse)
  }

  async get(params: HttpGetParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.get(params.url)
    } catch (error: any) {
      if (!error.response) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
        axiosResponse = {
          status: 500,
          data: undefined
        } as AxiosResponse
      } else {
        axiosResponse = error.response
      }
    }

    return this.adapt(axiosResponse)
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
