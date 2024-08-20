import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { STORAGE_AUTH_KEY, Workout } from "@/src/api/dtos";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/src/api";
import { useLoading } from "@/src/hooks";
import { WorkoutExercisesList } from "@/src/components/home/workoutExercisesList";
import { DayOfWeek, daysOfWeek } from "@/src/utils";
import { ArrowLeftRight, Play } from "lucide-react-native";
import { WorkoutOfTheDaySkeleton } from "@/src/components/skeletons/workoutOfTheDaySkeleton";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useModal } from "@/src/providers/ModalProvider";
import { BaseModal } from "@/src/components/baseModal";
import { SwitchWorkoutModal } from "@/src/components/home/switchWorkoutModal";
import { NoWorkout } from "@/src/components/home/noWokout";

const workoutAtom = atomWithStorage("focvs-workout", {} as Workout);

export default function HomePage() {
  const router = useRouter();
  const [workout, setWorkout] = useAtom<Workout>(workoutAtom);
  const loadingId = "fetch-workout";
  const { handleLoading, loading } = useLoading(loadingId);

  
  const fetchWorkoutOfTheDay = useCallback(async () => {
    try {
      handleLoading(loadingId, true);
      const workout = await api.workout.getWorkoutOfTheDay();

      setWorkout(workout);
    } catch (error) {
      handleLoading(loadingId, false);
    } finally {
      handleLoading(loadingId, false);
    }
  }, [setWorkout]);

  useEffect(() => {
    fetchWorkoutOfTheDay();
  }, [fetchWorkoutOfTheDay]);

  const { openModal: openSwichModal, closeModal: closeSwitchModal } = useModal(
    () => (
      <BaseModal title="Trocar treino" onClose={() => closeSwitchModal()}>
        <SwitchWorkoutModal />
      </BaseModal>
    ),
    [],
  );

  return (
    <View className="flex-col gap-16">
      {loading === false ? (
        <>
         {
          workout?.id ? (
           <>
             <View className="flex-col justify-between gap-4">
            <View className="flex-row items-center justify-between gap-3">
              <Text className="font-regular text-lg text-white opacity-70">
                {daysOfWeek[new Date().getDay() as DayOfWeek]}
              </Text>
              <TouchableOpacity onPress={() => router.push("/workouts")}>
                <Text className="border-b-[0.7px] border-orange-500 font-regular text-lg text-white opacity-70">
                  Meus treinos
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="font-regular text-2xl text-white">
                {workout.name}
              </Text>
              <View className="flex-row gap-4 rounded-lg bg-zinc-950 px-4 py-2">
                <TouchableOpacity
                  onPress={openSwichModal}
                  className="rounded-full bg-orange-500 p-2"
                >
                  <ArrowLeftRight size={15} color={"#000"} />
                </TouchableOpacity>
                <TouchableOpacity className="rounded-full bg-orange-500 p-2">
                  <Play size={15} color={"#000"} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <WorkoutExercisesList exercises={workout.exercises} id={workout.id} />
            </>
          ) : (
            <NoWorkout openSwitchModal={openSwichModal}/>
          )
         }
        </>
      ) : (
        <WorkoutOfTheDaySkeleton />
      )}
    </View>
  );
}
