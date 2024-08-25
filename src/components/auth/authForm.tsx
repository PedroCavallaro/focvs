import { Text, TouchableOpacity, View } from "react-native";
import { Input } from "../input";
import { Button } from "../button";
import { AUHT_FORM_STATE } from "@/src/app/auth/auth.types";
import { useCallback, useMemo } from "react";
import { FieldErrors } from "react-hook-form";
import {
  CreateAccountDTO,
  CreateAccountSchema,
  LoginDTO,
  LoginSchema,
} from "@/src/api/dtos/auth.dto";
import { useAuth, useForm } from "@/src/hooks";
import { Lock, Mail, User } from "lucide-react-native";
import { colors } from "@/src/style";
import { useRouter } from "expo-router";

type FormData = LoginDTO | CreateAccountDTO;

export function AuthForm({
  state,
  handleState,
}: {
  state: AUHT_FORM_STATE;
  handleState: () => void;
}) {
  const { login, createAccount } = useAuth();
  const router = useRouter();
  const formInfo = useMemo(() => {
    return {
      [AUHT_FORM_STATE.LOGIN]: {
        topButtonText: "Criar Conta",
        submitButtonText: "Entrar",
        schema: LoginSchema,
      },
      [AUHT_FORM_STATE.REGISTER]: {
        topButtonText: "Fazer Login",
        submitButtonText: "Cadastrar",
        schema: CreateAccountSchema,
      },
    };
  }, []);

  const submit = useCallback(
    async (data: FormData) => {
      if (state === AUHT_FORM_STATE.LOGIN) {
        await login(data);
      }

      await createAccount(data as CreateAccountDTO);
    },
    [router, login, createAccount],
  );

  const { reset, setValue, errors, handleSubmit } = useForm<FormData>({
    schema: formInfo[state].schema,
  });

  return (
    <View className="w-full flex-col">
      <View className="w-full items-end px-4">
        <TouchableOpacity
          className="flex-col gap-2"
          onPress={() => {
            reset();
            handleState();
          }}
        >
          <Text className="text-right font-regular text-lg text-white">
            {formInfo[state].topButtonText}
          </Text>
          <View className="h-[0.9px] bg-orange-500"></View>
        </TouchableOpacity>
      </View>
      <View className="w-full flex-col gap-5 border-white py-5">
        {state === AUHT_FORM_STATE.REGISTER && (
          <View>
            <Input>
              <User size={15} color={colors.zincBlur[200]} />
              <Input.Field
                placeholder="Nome"
                onChangeText={(v) => setValue("name", v)}
              />
            </Input>
            <Text className="mt-1 px-1 text-red-500">
              {(errors as FieldErrors<CreateAccountDTO>).name?.message}
            </Text>
          </View>
        )}
        <View>
          <Input>
            <Mail size={15} color={colors.zincBlur[200]} />
            <Input.Field
              placeholder="Email"
              onChangeText={(v) => setValue("email", v)}
            />
          </Input>
          <Text className="mt-1 px-1 text-red-500">
            {errors.email?.message}
          </Text>
        </View>
        <View>
          <Input>
            <Lock size={15} color={colors.zincBlur[200]} />
            <Input.Field
              secureTextEntry
              placeholder="Senha"
              onChangeText={(v) => setValue("password", v)}
            />
          </Input>
          <Text className="mt-1 px-1 text-red-500">
            {errors.password?.message}
          </Text>
        </View>
        {state === AUHT_FORM_STATE.LOGIN && (
          <TouchableOpacity
            onPress={() => router.push("/auth")}
            className="gap-2 px-2"
          >
            <Text className="font-regular text-lg text-white">
              Esqueceu sua senha?
            </Text>
            <View className="h-[0.9px] w-44 bg-orange-500"></View>
          </TouchableOpacity>
        )}
        <Button onPress={handleSubmit(submit)}>
          <Button.Title>{formInfo[state].submitButtonText}</Button.Title>
        </Button>
      </View>
    </View>
  );
}
