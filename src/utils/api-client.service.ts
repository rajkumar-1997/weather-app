import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
@Injectable()
export class ApiClientService {
  constructor() {}
  async get(
    url: string,
    headers: Record<string, string>,
    params: Record<string, any>,
  ) {
    const config: AxiosRequestConfig = {
      headers,
      params,
    };
    const response: AxiosResponse = await axios.get(url, config);
    return response.data;
  }

  async post(
    url: string,
    headers: Record<string, string>,
    data: Record<string, any>,
  ) {
    const config: AxiosRequestConfig = {
      headers,
    };
    const response: AxiosResponse = await axios.post(url, data, config);
    return response.data;
  }
}
