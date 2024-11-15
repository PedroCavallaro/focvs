import { MuscleDto } from "@/src/api/dtos";
import { plural } from "@/src/utils/plural";
import { Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";

export function MuscleCard({
  muscle,
  handleSelectMuscle,
}: {
  muscle: MuscleDto;
  handleSelectMuscle: (muscle: MuscleDto) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => handleSelectMuscle(muscle)}
      className="mx-1 mt-2 min-w-52 flex-col items-center justify-center gap-10 overflow-hidden rounded-lg border-b-[0.7px] border-orange-500 bg-black py-4"
    >
      <View className="items-center gap-2">
        <Text className="font-medium text-2xl text-white">{muscle?.name}</Text>
        <Text className="font-regular text-white opacity-70">
          {muscle.exerciseCount} {plural("exercício", muscle.exerciseCount)}
        </Text>
      </View>
      <Image
        style={{
          height: 160,
          width: "91.666667%",
          backgroundColor: "#FFFF",
          objectFit: "cover",
        }}
        source={{ uri: muscle.picture_url }}
      />
    </TouchableOpacity>
  );
}
