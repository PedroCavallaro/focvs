import { View, Text } from "react-native";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { api } from "@/src/api";
import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { ChangePasswordSchema } from "@/src/api/dtos";
import { useForm } from "@/src/hooks";

export function ChangePasswordForm() {
  const router = useRouter();

  const [error, setError] = useState(false);

  const { mutate: send } = useMutation({
    mutationFn: (data: ChangePasswordSchema) => changePassword(data),
  });

  const changePassword = useCallback(async (data: ChangePasswordSchema) => {
    if (data.password !== data.confirmPassword) {
      setError(true);

      return;
    }

    await api.auth.changePassword(data.password);

    router.push("/");
  }, []);

  const { setValue, errors, handleSubmit } = useForm<ChangePasswordSchema>({
    schema: ChangePasswordSchema,
  });

  return (
    <>
      <Text className="px-1 text-center font-regular text-lg leading-relaxed text-white">
        Escolha sua nova senha
      </Text>
      <View>
        <Input>
          <Input.Field
            placeholder="Nova senha"
            secureTextEntry
            onChangeText={(v) => setValue("password", v)}
          />
        </Input>
        {errors.password?.message && (
          <Text className="text-red-500">{errors.password.message}</Text>
        )}
      </View>
      <View>
        <Input>
          <Input.Field
            onChangeText={(v) => setValue("confirmPassword", v)}
            placeholder="Confirme a senha"
            secureTextEntry
          />
        </Input>

        {errors.confirmPassword?.message && (
          <Text className="text-red-500">{errors.confirmPassword.message}</Text>
        )}
        {error && (
          <Text className="text-red-500">As senhas não são iguais</Text>
        )}
      </View>

      <Button onPress={handleSubmit((data) => send(data))}>
        <Button.Title>Salvar</Button.Title>
      </Button>
    </>
  );
}
