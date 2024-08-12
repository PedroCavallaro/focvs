import { HttpClientFactory, HttpClient } from ".";
import { AxiosClient } from "../adapters";

export class HttpFactory implements HttpClientFactory {
  private readonly baseUrl: string;
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  createAxiosClient(): AxiosClient {
    return new AxiosClient(this.baseUrl);
  }
}
