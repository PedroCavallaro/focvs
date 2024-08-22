import { api } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { WorkoutDetailsCard } from "../workoutDetailsCard";
import { useCallback } from "react";
import { Workout } from "@/src/api/dtos";

export function SwitchWorkoutModal({
  setWorkout,
  close,
}: {
  setWorkout: (workout: Workout) => void;
  close: () => void;
}) {
  const { data } = useQuery({
    queryKey: ["user-workouts"],
    queryFn: () => api.workout.getWorkouts(),
  });

  const changeWorkout = useCallback(
    async (id: string) => {
      const res = await api.workout.getWorkout(id);

      setWorkout(res);
      close();
    },
    [setWorkout],
  );

  return (
    <ScrollView className="max-h-[45rem] w-full flex-col gap-4">
      <View className="mt-6 flex-col gap-6">
        {data?.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            onPress={() => changeWorkout(workout.id)}
          >
            <WorkoutDetailsCard workout={workout} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
