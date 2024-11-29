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
import { useCallback, useEffect, useState } from "react";

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
  workout,
  updating,
  changeOnWorkoutSampling,
  clearWorkout,
  setWorkout,
  close,
}: {
  updating: boolean;
  setWorkout: (workout: SaveWorkoutDTO) => void;
  workout: SaveWorkoutDTO;
  clearWorkout: () => void;
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
  const [refreshedWorkout, setRefreshedWorkout] = useState(workout);

  const changeOnWorkoutSamplinga = useCallback(
    ({
      type,
      setIndex,
      value,
      exerciseId,
    }: {
      type: "reps" | "weight";
      value: string;
      setIndex: number;
      exerciseId: string;
    }) => {
      if (!refreshedWorkout?.exercises) {
        return;
      }

      const exercises = refreshedWorkout.exercises;

      const parsedExercises = exercises?.map((e) => {
        if (e.id == exerciseId) {
          const set = e.sets[setIndex];

          set[type] = Number(value);

          e.sets[setIndex] = set;
        }

        return e;
      });

      setRefreshedWorkout((prev) => ({ ...prev, exercises: parsedExercises }));
    },
    [refreshedWorkout, setRefreshedWorkout],
  );

  useEffect(() => {
    setWorkout(refreshedWorkout);
  }, [refreshedWorkout]);

  const router = useRouter();
  const saveWorkout = useCallbackPlus(
    async (workout: SaveWorkoutDTO | UpdateWorkoutDTO) => {
      await save(workout, updating);

      router.replace("/home");

      close();
      clearWorkout();
    },
    [workout, updating, router, close, clearWorkout],
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
          {refreshedWorkout?.exercises?.map((exercise) => {
            return (
              <ExerciseCard
                hasActions
                editable={true}
                showCheckBox={false}
                onChange={changeOnWorkoutSamplinga}
                key={exercise.id}
                exercise={exercise}
                shouldEditAllAtSame
              />
            );
          })}
        </View>
        <View className="mb-10 flex w-full items-center justify-center">
          <Button onPress={() => saveWorkout(refreshedWorkout)}>
            <Button.Title>Salvar</Button.Title>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}
