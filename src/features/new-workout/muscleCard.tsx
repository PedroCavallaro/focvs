import { MuscleDto } from "@/src/api/dtos";
import { plural } from "@/src/utils/plural";
import { Text, TouchableOpacity, Image, View } from "react-native";

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
        source={{ uri: muscle.picture_url }}
        className="h-40 w-11/12 bg-white object-cover"
      />
    </TouchableOpacity>
  );
}
