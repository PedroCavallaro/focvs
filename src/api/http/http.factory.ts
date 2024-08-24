import { HttpClientFactory } from ".";
import { AxiosClient } from "../adapters";
import { Api, Repositorie } from "../repositories/repositorie";

export class HttpFactory implements HttpClientFactory {
  private readonly baseUrl: string;

  constructor(
    baseUrl: string,
    private readonly repos: Repositorie[],
  ) {
    this.baseUrl = baseUrl;
  }

  createAxiosClient(): Api {
    let api = {};
    const client = new AxiosClient(this.baseUrl);

    for (const repo of this.repos) {
      api = { ...api, ...repo.build(client) };
    }

    return api as Api;
  }
}
