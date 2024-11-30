import { zExt } from "@/src/utils/schema";
import { z } from "zod";

export const LoginSchema = z.object({
  email: zExt.string().email("Formato inválido"),
  password: zExt.string({
    min: 8,
  }),
});

export const ChangePasswordSchema = z.object({
  password: zExt.string({
    min: 8,
  }),
  confirmPassword: zExt.string({
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

export type ChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>;
export type CreateAccountDTO = z.infer<typeof CreateAccountSchema>;
export type AuthResponse = { token: string };
export type UserDTO = CreateAccountDTO & { id: string; imageUrl?: string };
export type GetRecoverPasswordCodeDTO = z.infer<
  typeof GetRecoverPasswordCodeSchema
>;
