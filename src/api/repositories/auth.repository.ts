import * as SecureStore from "expo-secure-store";
import {
  AuthResponse,
  CreateAccountDTO,
  GetRecoverPasswordCodeDTO,
  LoginDTO,
} from "../dtos";
import { HttpClient } from "../http";
import { Repository } from "./repository";
import { STORAGE_KEYS } from "@/src/utils";

export class AuthRepository extends Repository {
  constructor(api: HttpClient) {
    super(api);
  }

  static build(api: HttpClient) {
    return { auth: new AuthRepository(api) };
  }

  async login(data: LoginDTO): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>("/auth/login", {
      body: data,
    });

    return response;
  }

  async createAccount(data: CreateAccountDTO): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>("/auth/register", {
      body: data,
    });

    return response;
  }

  async getRecoverPasswordToken(data: GetRecoverPasswordCodeDTO) {
    const response = await this.api.post<AuthResponse>("/auth/recover-token", {
      body: data,
    });

    return response;
  }

  async sendCode(code: string) {
    const token = await SecureStore.getItemAsync(
      STORAGE_KEYS.RECOVER_PASSWORD_TOKEN,
    );

    const response = await this.api.post<AuthResponse>("/auth/validate", {
      body: { code: Number(code) },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  }

  async changePassword(password: string) {
    const token = await SecureStore.getItemAsync(
      STORAGE_KEYS.RECOVER_PASSWORD_TOKEN,
    );

    const response = await this.api.post<AuthResponse>(
      "/auth/change-password",
      {
        body: { password },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response;
  }
}
