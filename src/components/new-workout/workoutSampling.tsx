import { SaveWorkout, SaveWorkoutDTO } from "@/src/api/dtos";
import { DayOfWeek, daysOfWeek } from "@/src/utils";
import { View, Text, ScrollView } from "react-native";
import { Button } from "../button";
import { ExerciseCard } from "../exerciseCard";
import { useCallbackPlus } from "@/src/hooks";
import { api } from "@/src/api";
import { useRouter } from "expo-router";

export function WorkoutSampling({
  workout,
  close,
}: {
  workout: SaveWorkoutDTO;
  close: () => void;
}) {
  const router = useRouter();
  const saveWorkout = useCallbackPlus(
    async (workout: SaveWorkoutDTO) => {
      const parsedWorkout = SaveWorkout.parse(workout);

      await api.workout.createWorkout(parsedWorkout);

      router.replace("/home");
      close();
    },
    [workout, router],
  );

  return (
    <View className="h-[82%] flex-col gap-8">
      <View className="flex-row justify-between">
        <View className="flex-col gap-2">
          <Text className="text-md font-regular text-white opacity-70">
            Nome
          </Text>
          <Text className="font-regular text-lg text-white">
            {workout.name}
          </Text>
        </View>
        <View className="flex-col gap-2">
          <Text className="text-md font-regular text-white opacity-70">
            Dia da semana
          </Text>
          <Text className="font-lg font-regular text-white">
            {daysOfWeek?.[workout.day as DayOfWeek]}
          </Text>
        </View>
      </View>
      <Text className="text-md font-regular text-white opacity-70">
        Exercícios
      </Text>
      <ScrollView>
        <View className="w-full flex-col gap-10">
          {workout.exercises.map((exercise) => {
            return (
              <ExerciseCard
                showCheckBox={false}
                key={exercise.exerciseId}
                exercise={exercise}
              />
            );
          })}
        </View>
      </ScrollView>
      <View className="absolute bottom-5 z-10 flex w-full items-center justify-center">
        <Button onPress={() => saveWorkout(workout)}>
          <Button.Title>Salvar</Button.Title>
        </Button>
      </View>
    </View>
  );
}
