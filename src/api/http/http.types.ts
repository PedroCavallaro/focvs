import { AxiosClient } from "../adapters";

export interface RequestOptions {
  headers?: Record<string, string>;
  body?: unknown;
  query?: Record<string, unknown>;
}

export interface HttpClientFactory {
  createAxiosClient(): AxiosClient;
}
