import { Api } from "../repositories/repository";

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, unknown>;
}

export interface HttpClientFactory {
  createAxiosClient(): Api;
}
