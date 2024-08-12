import { HttpClient } from "../http";

export abstract class Repositorie {
  protected readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
  }
}
