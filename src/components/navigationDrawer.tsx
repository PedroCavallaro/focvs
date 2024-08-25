import { View } from "react-native";
import { Button } from "./button";
import { useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { STORAGE_KEYS } from "../constants";
import { Storage } from "../services";

export function NavigationDrawer({ close }: { close: () => void }) {
  const router = useRouter();

  const exit = useCallback(async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN),
      Storage.removeItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY),
    ]);

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
