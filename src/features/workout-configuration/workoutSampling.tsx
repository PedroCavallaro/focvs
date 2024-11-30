import {
  SaveWorkout,
  SaveWorkoutDTO,
  UpdateWorkout,
  UpdateWorkoutDTO,
} from "@/src/api/dtos";
import { DayOfWeek, daysOfWeek } from "@/src/utils";
import { View, Text, ScrollView } from "react-native";
import { Button } from "../../components/button";
import { ExerciseCard } from "../exerciseCard/exerciseCard";
import { useCallbackPlus } from "@/src/hooks";
import { api } from "@/src/api";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { WorkoutConfigurationActions } from "../exerciseCard/actions/workoutConfigurationActions";
import * as Crypto from "expo-crypto";

async function save(
  workout: SaveWorkoutDTO | UpdateWorkoutDTO,
  updating: boolean,
) {
  try {
    if (updating) {
      const parsedUpdateWorkout = UpdateWorkout.parse(workout);

      return await api.workout.updateWorkout(parsedUpdateWorkout);
    }

    const parsedWorkout = SaveWorkout.parse(workout);

    return await api.workout.createWorkout(parsedWorkout);
  } catch (error) {
    console.log(error);
  }
}

export function WorkoutSampling({
  workout,
  updating,
  clearWorkout,
  setWorkout,
  close,
}: {
  updating: boolean;
  setWorkout: (workout: SaveWorkoutDTO) => void;
  workout: SaveWorkoutDTO;
  clearWorkout: () => void;
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

  const addSetOnExercise = useCallback(
    (exerciseId: string) => {
      setRefreshedWorkout((prev) => {
        const exercises = prev.exercises.map((exercise) => {
          if (exercise.id !== exerciseId) return exercise;

          exercise.sets = [
            ...exercise.sets,
            {
              reps: 1,
              weight: 1,
              done: false,
              id: Crypto.randomUUID(),
              set_number: exercise.sets.length + 1,
            },
          ];

          return exercise;
        });

        return { ...prev, exercises };
      });
    },
    [setRefreshedWorkout],
  );

  const popSet = useCallback(
    (exerciseId: string) => {
      console.log("oi");
      setRefreshedWorkout((prev) => {
        const ids: string[] = [];
        const exercises = prev.exercises.map((exercise) => {
          if (exercise.id !== exerciseId) return exercise;

          if (exercise.sets.length <= 1) return exercise;

          ids.push(exercise.sets[exercise.sets.length - 1]?.id ?? "");

          exercise.sets = exercise.sets.slice(0, exercise.sets.length - 1);

          return exercise;
        });

        console.log(ids);

        return {
          ...prev,
          exercises,
          deletedSets: [...(prev.deletedSets ?? []), ...ids],
        };
      });
    },
    [setRefreshedWorkout],
  );

  const removeExerciseFromWorkout = useCallback(
    (exerciseId: string) => {
      setRefreshedWorkout((prev) => {
        if (prev.exercises.length === 1) return prev;

        const exercise = prev.exercises.find(
          (exercise) => exercise.id === exerciseId,
        );

        const ids = exercise?.sets.map((s) => s.id);

        const exercises = prev.exercises.filter(
          (exercise) => exercise.id !== exerciseId,
        );

        return {
          ...prev,
          deletedSets: [
            ...(prev?.deletedSets ?? []),
            ...(ids ?? []),
          ] as string[],
          exercises,
        };
      });
    },
    [setRefreshedWorkout],
  );

  useEffect(() => {
    setWorkout(refreshedWorkout);
  }, [refreshedWorkout]);

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
                editable={true}
                showCheckBox={false}
                onChange={changeOnWorkoutSamplinga}
                key={exercise.id}
                exercise={exercise}
                shouldEditAllAtSame
              >
                <WorkoutConfigurationActions
                  popSet={popSet}
                  removeExerciseFromWorkout={removeExerciseFromWorkout}
                  addSetOnExercise={addSetOnExercise}
                />
              </ExerciseCard>
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
