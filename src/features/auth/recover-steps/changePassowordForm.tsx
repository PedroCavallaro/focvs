import { View, Text } from "react-native";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { RECOVER_PASSWORD_STATE } from "@/src/app/auth/auth.types";

export function ChangePasswordForm({
  handleState,
}: {
  handleState: (state: RECOVER_PASSWORD_STATE) => void;
}) {
  return (
    <>
      <Text className="px-1 text-center font-regular text-lg leading-relaxed text-white">
        Escolha sua nova senha
      </Text>
      <View>
        <Input>
          <Input.Field placeholder="Nova senha" secureTextEntry />
        </Input>
      </View>
      <View>
        <Input>
          <Input.Field placeholder="Confirme a senha" secureTextEntry />
        </Input>
      </View>
      <Button>
        <Button.Title>Salvar</Button.Title>
      </Button>
    </>
  );
}
