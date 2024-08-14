import { MuscleDto } from "@/src/api/dtos";
import { Text, TouchableOpacity, Image, View } from "react-native";

export function MuscleCard({muscle, handleSelectMuscle}: {muscle: MuscleDto, handleSelectMuscle: (muscle: MuscleDto) => void}) {
  return (
    <TouchableOpacity onPress={() => handleSelectMuscle(muscle)} className="mx-1 mt-2 min-w-52 flex-col items-center justify-center gap-10 overflow-hidden rounded-lg border-b-[0.7px] border-orange-500 bg-black py-4">
      <View className="items-center gap-2">
        <Text className="font-medium text-2xl text-white">{muscle?.name}</Text>
        <Text className="font-regular text-white opacity-70">
          15 exercícios
        </Text>
      </View>

      <Image
        source={{ uri: "http://192.168.101.12:8888/v1/supino.gif" }}
        className="h-40 w-11/12 bg-white object-cover"
      />
    </TouchableOpacity>
  );
}
