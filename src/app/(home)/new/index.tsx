import { MusclePicker } from "@/src/components/new-workout/musclePicker";
import { NewWorkoutForm } from "@/src/components/new-workout/newWorkoutForm";
import { View, Text } from "react-native";

export default function NewWorkout() {
  return (
    <View className="flex-col gap-14">
      <View className="flex-col gap-8">
        <Text className="text-lg font-light text-white">Novo treino</Text>
        <NewWorkoutForm />
      </View>
      <MusclePicker />
    </View>
  );
}
