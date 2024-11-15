import {
  SaveWorkout,
  SaveWorkoutDTO,
  UpdateWorkout,
  UpdateWorkoutDTO,
} from "@/src/api/dtos";
import { DayOfWeek, daysOfWeek } from "@/src/utils";
import { View, Text, ScrollView } from "react-native";
import { Button } from "../../components/button";
import { ExerciseCard } from "../exerciseCard";
import { useCallbackPlus } from "@/src/hooks";
import { api } from "@/src/api";
import { useRouter } from "expo-router";
import { useWorkouConfiguration } from "@/src/app/__workout-configuration__/workout-configuration";

async function save(
  workout: SaveWorkoutDTO | UpdateWorkoutDTO,
  updating: boolean,
) {
  if (updating) {
    const parsedUpdateWorkout = UpdateWorkout.parse(workout);

    return await api.workout.updateWorkout(parsedUpdateWorkout);
  }

  const parsedWorkout = SaveWorkout.parse(workout);

  return await api.workout.createWorkout(parsedWorkout);
}

export function WorkoutSampling({
  updating,
  workout,
  changeOnWorkoutSampling,
  close,
}: {
  updating: boolean;
  workout: SaveWorkoutDTO;
  changeOnWorkoutSampling: ({
    type,
    setIndex,
    value,
    exerciseId,
  }: {
    type: "reps" | "weight";
    value: string;
    setIndex: number;
    exerciseId: string;
  }) => void;
  close: () => void;
}) {
  const { clearWorkout } = useWorkouConfiguration();

  const router = useRouter();
  const saveWorkout = useCallbackPlus(
    async (workout: SaveWorkoutDTO | UpdateWorkoutDTO) => {
      console.log(workout);
      await save(workout, updating);

      router.replace("/home");

      close();
      clearWorkout();
    },
    [workout, router, close, clearWorkout],
  );

  return (
    <ScrollView>
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

        <View className="w-full flex-col gap-10">
          {workout?.exercises?.map((exercise) => {
            return (
              <ExerciseCard
                editable={true}
                showCheckBox={false}
                onChange={changeOnWorkoutSampling}
                key={exercise.id}
                exercise={exercise}
                shouldEditAllAtSame
              />
            );
          })}
        </View>
        <View className="mb-10 flex w-full items-center justify-center">
          <Button onPress={() => saveWorkout(workout)}>
            <Button.Title>Salvar</Button.Title>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
