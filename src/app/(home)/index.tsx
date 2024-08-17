import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { NoWorkout } from "@/src/components/home/noWokout";
import * as Sec from "expo-secure-store"
import { STORAGE_AUTH_KEY } from "@/src/api/dtos";

export default function HomePage() {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity className="text-white" onPress={() => {Sec.deleteItemAsync(STORAGE_AUTH_KEY) 
        router.push('/')
      }}>
        <Text>CLICA</Text>

      </TouchableOpacity>
      <NoWorkout />
    </View>
  );
}
