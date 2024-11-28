import {
  AuthResponse,
  CreateAccountDTO,
  GetRecoverPasswordCodeDTO,
  LoginDTO,
} from "../dtos";
import { HttpClient } from "../http";
import { Repository } from "./repository";

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
}
