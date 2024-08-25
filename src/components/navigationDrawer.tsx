import { View } from "react-native";
import { Button } from "./button";
import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { STORAGE_AUTH_KEY } from "../api/dtos";
import { useRouter } from "expo-router";

export function NavigationDrawer({ close }: { close: () => void }) {
  const router = useRouter();

  const exit = useCallback(async () => {
    await SecureStore.deleteItemAsync(STORAGE_AUTH_KEY);

    router.replace("/");
    close();
  }, [router, close]);

  return (
    <View className="h-[82%] flex-col gap-8">
      <Button onPress={() => exit()}>
        <Button.Title>Sair</Button.Title>
      </Button>
    </View>
  );
}
