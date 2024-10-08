import {
  AuthResponse,
  CreateAccountDTO,
  GetRecoverPasswordCodeDTO,
  LoginDTO,
} from "../dtos";
import { HttpClient } from "../http";

export class AuthRepository {
  protected readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
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
    try {
      const response = await this.api.post<AuthResponse>("/auth/register", {
        body: data,
      });

      console.log(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getRecoverPasswordToken(data: GetRecoverPasswordCodeDTO) {
    const response = await this.api.post<AuthResponse>("/auth/recover-token", {
      body: data,
    });

    return response;
  }
}
