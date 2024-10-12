import { useCallback, useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStorage from "expo-secure-store";
import { router } from "expo-router";
import { View, Text } from "react-native";
import { AuthForm } from "../features/auth/authForm";
import { AUHT_FORM_STATE } from "./auth/auth.types";
import { UserDTO } from "../api/dtos";
import { useAuth } from "../hooks";
import { jwtDecode } from "jwt-decode";
import { STORAGE_KEYS } from "../utils/keys";

export default function Index() {
  const [formState, setFormState] = useState(AUHT_FORM_STATE.LOGIN);
  const { setUser } = useAuth();

  const handleState = useCallback(() => {
    if (formState === AUHT_FORM_STATE.LOGIN) {
      return setFormState(AUHT_FORM_STATE.REGISTER);
    }

    return setFormState(AUHT_FORM_STATE.LOGIN);
  }, [formState]);

  const autheticateWithBiometry = useCallback(async () => {
    const token = await SecureStorage.getItemAsync(STORAGE_KEYS.AUTH_TOKEN);

    if (!token) return;

    return router.push("/home");

    const user = jwtDecode<UserDTO>(token as string);

    if (user) {
      setUser(user);

      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: "Entrar",
      });

      if (success) {
        router.push("/home");
      }
    }
  }, []);

  useEffect(() => {
    autheticateWithBiometry();
  }, []);

  return (
    <View className="flex-1 flex-col items-center justify-end gap-20">
      <View className="flex-col items-center gap-2">
        <Text className="font-medium text-5xl leading-relaxed tracking-[0.2rem] text-white">
          FOC<Text className="font-medium text-orange-500">V</Text>S
        </Text>
      </View>
      <AuthForm state={formState} handleState={handleState} />
    </View>
  );
}
