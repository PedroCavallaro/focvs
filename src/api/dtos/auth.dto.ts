import { zExt } from "@/src/utils/schema";
import { z } from "zod";

export const STORAGE_AUTH_KEY = "focvs_auth";
export const STORAGE_RECOVER_PASSWORD_TOKEN = "focvs_recover-password-token";

export const LoginSchema = z.object({
  email: zExt.string().email("Formato inválido"),
  password: zExt.string({
    min: 8,
  }),
});

export const CreateAccountSchema = z.object({
  name: zExt.string({ min: 3 }),
  email: zExt.string().email("Formato inválido"),
  password: zExt.string({ min: 8 }),
});

export const GetRecoverPasswordCodeSchema = z.object({
  email: zExt.string().email("Formato inválido"),
});

export type LoginDTO = z.infer<typeof LoginSchema>;
export type CreateAccountDTO = z.infer<typeof CreateAccountSchema>;
export type AuthResponse = { token: string };
export type UserDTO = CreateAccountDTO & { imageUrl?: string };
export type GetRecoverPasswordCodeDTO = z.infer<
  typeof GetRecoverPasswordCodeSchema
>;
