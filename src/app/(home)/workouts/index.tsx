import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

export default function Workouts() {
  const router = useRouter();
  return (
    <View className="flex-col gap-10">
      <View className="flex-row justify-between">
        <Text className="font-regular text-2xl text-white">Meus Treinos</Text>
        <TouchableOpacity
          onPress={() => router.push("/new")}
          className="border-b-[0.7px] border-orange-500 text-white"
        >
          <Plus color={"#FFF"} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
