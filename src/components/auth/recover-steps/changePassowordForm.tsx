import { View, Text } from "react-native";
import { Input } from "../../input";
import { Button } from "../../button";
import { RECOVER_PASSWORD_STATE } from "@/src/app/auth/auth.types";

export function ChangePasswordForm({
  handleState,
}: {
  handleState: (state: RECOVER_PASSWORD_STATE) => void;
}) {
  return (
    <>
      <Text className="px-1 text-center font-regular text-lg leading-relaxed text-white">
        Digite o código que foi enviado para o email e****@g***.com
      </Text>
      <View>
        <Input>
          <Input.Field placeholder="Email" />
        </Input>
      </View>
      <Button>
        <Button.Title>Enviar</Button.Title>
      </Button>
    </>
  );
}
