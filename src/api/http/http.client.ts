import { STORAGE_KEYS } from "@/src/utils/keys";
import { RequestOptions } from "./http.types";
import * as SecureStorage from "expo-secure-store";

export abstract class HttpClient {
  protected readonly skipAuthTokenUrls: string[];
  private _baseUrl: string;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this.skipAuthTokenUrls = ["auth"];
  }

  protected abstract doRequest<T>(
    method: string,
    url: string,
    options: RequestOptions,
  ): Promise<T>;

  protected async getAuthTokenHeader() {
    const token = await SecureStorage.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);

    if (!token) {
      return null;
    }

    return { Authorization: `Bearer ${token}` };
  }
  protected _concatEndpoint(endpoint: string, options: RequestOptions) {
    let query = "";

    if (options.query) {
      const buildQuery = new URLSearchParams();

      for (const key in options.query) {
        const value = options.query[key];

        if (value !== undefined) {
          buildQuery.append(key, value?.toString() ?? "null");
        }
      }

      query = "?" + buildQuery.toString();
    }

    const pathName = endpoint[0] !== "/" ? `/${endpoint}` : endpoint;

    return this._baseUrl + pathName + query;
  }

  get<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.doRequest("GET", url, options);
  }

  post<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.doRequest("POST", url, options);
  }

  put<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.doRequest("PUT", url, options);
  }

  delete<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.doRequest("DELETE", url, options);
  }

  patch<T>(url: string, options: RequestOptions = {}): Promise<T> {
    return this.doRequest("PATCH", url, options);
  }

  setBaseUrl(val: string) {
    this._baseUrl = val;
  }
}
