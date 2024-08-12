import { Header } from "@/src/components/header";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import * as Secure from "expo-secure-store";
import { api } from "@/src/api";
import { STORAGE_AUTH_KEY } from "@/src/api/dtos";
export default function HomePage() {
  const router = useRouter();

  api.workout.getWorkouts();
  return (
    <>
      <View className="mt-6">
        <Header />
        <View className="px-2">
          <TouchableOpacity
            onPress={() => {
              Secure.deleteItemAsync(STORAGE_AUTH_KEY);
              router.push("/");
            }}
          >
            <Text className="text-white">clica</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
