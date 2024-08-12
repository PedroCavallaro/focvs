import { View, Text } from "react-native";
import { Input } from "../../input";
import { Button } from "../../button";
import { RECOVER_PASSWORD_STATE } from "@/src/app/auth/auth.types";
import {
  GetRecoverPasswordCodeDTO,
  GetRecoverPasswordCodeSchema,
  STORAGE_RECOVER_PASSWORD_TOKEN,
} from "@/src/api/dtos";
import { useCallbackPlus, useForm } from "@/src/hooks";
import { api } from "@/src/api";
import * as SecureStorage from "expo-secure-store";

export function GetRecoverCode({
  handleState,
}: {
  handleState: (state: RECOVER_PASSWORD_STATE) => void;
}) {
  const { setValue, handleSubmit } = useForm<GetRecoverPasswordCodeDTO>({
    schema: GetRecoverPasswordCodeSchema,
  });

  const submit = useCallbackPlus(async (data: GetRecoverPasswordCodeDTO) => {
    const { token } = await api.auth.getRecoverPasswordToken(data);

    await SecureStorage.setItemAsync(STORAGE_RECOVER_PASSWORD_TOKEN, token);

    handleState(RECOVER_PASSWORD_STATE.TYPE_CODE);
  }, []);

  return (
    <>
      <Text className="px-1 text-center font-regular text-lg leading-relaxed text-white">
        Enviaremos um código de quatro dígitos para o email digitado, se ele
        tiver uma conta
      </Text>
      <View>
        <Input>
          <Input.Field
            placeholder="Email"
            onChangeText={(v) => setValue("email", v)}
          />
        </Input>
      </View>
      <Button onPress={handleSubmit((data) => submit(data))}>
        <Button.Title>Enviar</Button.Title>
      </Button>
    </>
  );
}
