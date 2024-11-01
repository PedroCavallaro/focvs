import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import { DayOfWeek, daysOfWeek } from "@/src/utils";
import { useModal } from "@/src/providers/modalProvider";
import { BaseModal } from "@/src/components/baseModal";
import { SwitchWorkoutModal } from "@/src/features/home/switchWorkoutModal";
import { NoWorkout } from "@/src/features/home/noWokout";
import { WorkoutActions } from "@/src/features/home/workoutActions";
import { useWorkout } from "@/src/providers/workoutProvider";
import { ExerciseCard } from "@/src/features/exerciseCard";
// import notifee from "@notifee/react-native";

export default function HomePage() {
  const router = useRouter();
  const { isLoading, workout, finishWorkout, startWorkout, setWorkout } =
    useWorkout();

  const onChange = useCallback(
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
      if (!workout?.exercises) return;

      const exercises = workout.exercises;

      const parsedExercises = exercises?.map((e) => {
        if (e.exerciseId == exerciseId) {
          const set = e.sets[setIndex];

          set[type] = Number(value);

          e.sets[setIndex] = set;

          const currentSet = workout.currentSets?.[e.exerciseId];

          if (workout.currentSets) {
            workout.currentSets[exerciseId] = currentSet ? currentSet + 1 : 0;
          }
        }

        return e;
      });

      setWorkout((prev) => ({ ...prev, exercises: parsedExercises }));
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
  // future stuff
  // async function onDisplayNotification() {
  //   await notifee.requestPermission();

  //   const channelId = await notifee.createChannel({
  //     id: "default",
  //     name: "Default Channel",
  //   });

  //   await notifee.displayNotification({
  //     title: "Notification Title",
  //     body: "Main body content of the notification",
  //     android: {
  //       channelId,
  //       smallIcon: "name-of-a-small-icon",
  //       pressAction: {
  //         id: "default",
  //       },
  //     },
  //   });
  // }

  return (
    <View className="h-full flex-col gap-8">
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
                <View className="flex-row items-center justify-between gap-2">
                  <View className="flex-row items-center gap-2">
                    <Text className="font-regular text-2xl text-white">
                      {workout.name}
                    </Text>
                    <View className="flex-row justify-between gap-4 rounded-lg px-4 py-2">
                      <WorkoutActions
                        openSwichModal={openSwichModal}
                        finishWorkout={finishWorkout}
                        startWorkout={startWorkout}
                        started={workout?.info?.started ?? false}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <View className="flex-col gap-10 px-2">
                  {workout.exercises?.map((e, i) => {
                    return (
                      <ExerciseCard
                        showCheckBox={true}
                        exercise={e}
                        key={i}
                        onChange={onChange}
                        editable={workout?.info?.started ?? false}
                        shouldEditOneByOne
                        shoulDecreaseOpacity
                      />
                    );
                  })}
                </View>
              </View>
            </>
          ) : (
            <NoWorkout openSwitchModal={openSwichModal} />
          )}
        </>
      )}
    </View>
  );
}
