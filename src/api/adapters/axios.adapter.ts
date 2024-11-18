import axios, { AxiosRequestConfig } from "axios";
import { HttpClient, RequestOptions } from "../http";

export class AxiosClient extends HttpClient {
  protected async doRequest<T>(
    method: string,
    url: string,
    options: RequestOptions,
  ): Promise<T> {
    if (!this.skipAuthTokenUrls.includes(url)) {
      const authHeader = await this.getAuthTokenHeader();

      options.headers = {
        ...options.headers,
        ...authHeader,
      };
    }

    // add interceptors
    const request: AxiosRequestConfig = {
      baseURL: this._concatEndpoint(url, options),
      data: options.body,
      headers: options.headers,
      method,
    };

    console.log(request);
    const response = await axios.request<T>(request);

    return response.data;
  }
}
