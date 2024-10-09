import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Workout } from "@/src/api/dtos";
import { useCallback } from "react";
import { api } from "@/src/api";
import { WorkoutExercisesList } from "@/src/features/home/workoutExercisesList";
import { DayOfWeek, daysOfWeek } from "@/src/utils";
import { useAtom } from "jotai";
import { useModal } from "@/src/providers/modalProvider";
import { BaseModal } from "@/src/components/baseModal";
import { SwitchWorkoutModal } from "@/src/features/home/switchWorkoutModal";
import { NoWorkout } from "@/src/features/home/noWokout";
import { useQuery } from "@tanstack/react-query";
import { Storage } from "@/src/services";
import { atomWithAsyncStorage } from "@/src/lib";
import { WorkoutActions } from "@/src/features/home/workoutActions";
import { STORAGE_KEYS } from "@/src/utils/keys";

const workoutAtom = atomWithAsyncStorage<Workout>(
  STORAGE_KEYS.WORKOUT_OF_THE_DAY,
  {} as Workout,
);

export default function HomePage() {
  const router = useRouter();
  const [workout, setWorkout] = useAtom(workoutAtom);

  const fetchWorkoutOfTheDay = useCallback(async () => {
    const hasOnStorage = await Storage.getItem<Workout>(
      STORAGE_KEYS.WORKOUT_OF_THE_DAY,
    );

    if (!hasOnStorage) {
      const workout = await api.workout.getWorkoutOfTheDay();

      setWorkout(workout);
    }

    return true;
  }, [setWorkout]);

  const { isLoading } = useQuery({
    queryKey: ["workout-of-the-day"],
    queryFn: () => fetchWorkoutOfTheDay(),
  });

  const startWorkout = useCallback(() => {
    setWorkout((prev) => ({
      ...prev,
      started: 0,
    }));
  }, [setWorkout]);

  const finishWorkout = useCallback(() => {
    setWorkout((prev) => ({
      ...prev,
      started: 0,
    }));
  }, [setWorkout]);

  const onChange = useCallback(
    (type: "reps" | "weight", v: string, exerciseId: string) => {
      const exercises = workout.exercises;

      const exercise = exercises.find((e) => e.exerciseId == exerciseId);
    },
    [],
  );

  const { openModal: openSwichModal, closeModal: closeSwitchModal } = useModal(
    () => (
      <BaseModal title="Trocar treino" onClose={() => closeSwitchModal()}>
        <SwitchWorkoutModal
          setWorkout={setWorkout}
          close={() => closeSwitchModal()}
        />
      </BaseModal>
    ),
    [],
  );

  return (
    <View className="flex-col gap-8">
      {!isLoading && (
        <>
          {workout?.id ? (
            <>
              <View className="flex-col justify-between gap-4">
                <View className="flex-row items-center justify-between gap-3">
                  <Text className="font-regular text-lg text-white opacity-70">
                    {daysOfWeek[new Date().getDay() as DayOfWeek]}
                  </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/home/workouts")}
                  >
                    <Text className="border-b-[0.7px] border-orange-500 font-regular text-lg text-white opacity-70">
                      Meus treinos
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center gap-2">
                  <Text className="font-regular text-2xl text-white">
                    {workout.name}
                  </Text>
                  <View className="flex-row gap-4 rounded-lg px-4 py-2">
                    <WorkoutActions
                      openSwichModal={openSwichModal}
                      finishWorkout={finishWorkout}
                      startWorkout={startWorkout}
                      started={workout.started ?? 0}
                    />
                  </View>
                </View>
              </View>
              <WorkoutExercisesList
                exercises={workout.exercises}
                started={workout.started ?? 0}
              />
            </>
          ) : (
            <NoWorkout openSwitchModal={openSwichModal} />
          )}
        </>
      )}
    </View>
  );
}
