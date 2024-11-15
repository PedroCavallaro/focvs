import { ExerciseDto } from "@/src/api/dtos";
import { TouchableOpacity, View, Text } from "react-native";
import { Image } from "expo-image";

export function ExercisePickerCard({
  exercise,
  openModal,
}: {
  exercise: ExerciseDto;
  openModal: (exercise: ExerciseDto) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => openModal(exercise)}
      className="mx-1 mt-2 min-w-52 flex-col items-center justify-center gap-10 overflow-hidden rounded-lg border-b-[0.7px] border-orange-500 bg-black py-4"
    >
      <View className="items-center gap-2">
        <Text className="font-medium text-2xl text-white">
          {exercise?.name}
        </Text>
      </View>
      <Image
        source={{ uri: exercise.gif_url }}
        className="h-40 w-11/12 bg-white object-cover"
      />
    </TouchableOpacity>
  );
}
