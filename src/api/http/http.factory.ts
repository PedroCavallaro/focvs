import { HttpClientFactory } from ".";
import { AxiosClient } from "../adapters";
import { Api, Repositorie } from "../repositories/repository";

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

    for (const repo of this.repos) {
      const client = new AxiosClient(this.baseUrl);

      api = { ...api, ...repo.build(client) };
    }

    return api as Api;
  }
}
