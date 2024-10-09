import { View, Text } from "react-native";
import { Input } from "../../../components/input";
import { Button } from "../../../components/button";
import { RECOVER_PASSWORD_STATE } from "@/src/app/auth/auth.types";
import { UserDTO } from "@/src/api/dtos";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as SecureStorage from "expo-secure-store";
import { jwtDecode } from "jwt-decode";
import { STORAGE_KEYS } from "@/src/utils/constants";

export function TypeCodeForm({
  handleState,
}: {
  handleState: (state: RECOVER_PASSWORD_STATE) => void;
}) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  const getToken = useCallback(async () => {
    const res = await SecureStorage.getItemAsync(
      STORAGE_KEYS.RECOVER_PASSWORD_TOKEN,
    );

    if (res) {
      const user = jwtDecode<UserDTO>(res);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    getToken();
  }, [getToken]);

  const emailString = useMemo(() => {
    const splitedEmail = user?.email?.split("@");

    let email = "";
    if (splitedEmail) {
      const firstSegment = splitedEmail[0]?.slice(1, splitedEmail[0].length);
      email +=
        splitedEmail[0].slice(0, 1) +
        Array(firstSegment.length).fill("*").join("");

      const secondSegment = splitedEmail[1]?.slice(
        1,
        splitedEmail[1].length - 4,
      );

      email +=
        "@" +
        splitedEmail[1].slice(0, 1) +
        Array(secondSegment.length).fill("*").join("") +
        ".com";

      return email;
    }

    return "";
  }, [user]);

  return (
    <>
      <Text className="px-1 text-center font-regular text-lg leading-relaxed text-white">
        Digite o código que foi enviado para o email {emailString}
      </Text>
      <View className="flex flex-row justify-evenly gap-5 px-4">
        <View className="w-1/5">
          <Input>
            <Input.Field
              maxLength={1}
              keyboardType="numeric"
              className="text-center text-white"
              placeholder="*"
            />
          </Input>
        </View>
        <View className="w-1/5">
          <Input>
            <Input.Field
              maxLength={1}
              keyboardType="number-pad"
              className="text-center text-white"
              placeholder="*"
            />
          </Input>
        </View>
        <View className="w-1/5">
          <Input>
            <Input.Field
              maxLength={1}
              keyboardType="numeric"
              className="text-center text-white"
              placeholder="*"
            />
          </Input>
        </View>
        <View className="w-1/5">
          <Input>
            <Input.Field
              maxLength={1}
              keyboardType="numeric"
              className="text-center text-white"
              placeholder="*"
            />
          </Input>
        </View>
      </View>
      <Button>
        <Button.Title>Enviar</Button.Title>
      </Button>
    </>
  );
}
