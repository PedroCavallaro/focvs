import { api } from "@/src/api";
import { WorkoutDetails } from "@/src/api/dtos";
import { plural } from "@/src/utils/plural";
import { useMutation } from "@tanstack/react-query";
import { Share, X } from "lucide-react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export function WorkoutActionsModal({
  workout,
  onDelete,
}: {
  workout: WorkoutDetails;
  onDelete: () => void;
}) {
  const { mutate: delteWorkout } = useMutation({
    mutationFn: (id: string) => api.workout.deleteWorkout(id),
    onSuccess: () => onDelete(),
  });

  return (
    <View className="flex-col gap-6">
      <View className="flex-row gap-3">
        <Image
          source={{ uri: workout.picture_url }}
          className="h-20 w-20 bg-white"
        />
        <View className="flex-col gap-1">
          <Text className="font-regular text-lg text-white">
            {workout.name}
          </Text>
          <Text className="font-regular text-white/70">
            {workout.exerciseAmount}{" "}
            {plural("exercicíco", workout.exerciseAmount)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => delteWorkout(workout.id)}
        className="flex-row items-center gap-2 opacity-70"
      >
        <X color={"#fff"} size={20} />
        <Text className="font-regular text-lg text-white">Apagar treino</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center gap-2 opacity-70">
        <Share color={"#fff"} size={20} />
        <Text className="font-regular text-lg text-white">
          Compatilhar treino
        </Text>
      </TouchableOpacity>
    </View>
  );
}
