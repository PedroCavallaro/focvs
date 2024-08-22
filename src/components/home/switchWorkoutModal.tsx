import { api } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { WorkoutDetailsCard } from "../workoutDetailsCard";

export function SwitchWorkoutModal() {
  const { data } = useQuery({
    queryKey: ["user-workouts"],
    queryFn: () => api.workout.getWorkouts(),
  });

  return (
    <ScrollView className="max-h-[45rem] w-full flex-col gap-4">
      <View className="mt-6 flex-col gap-6">
        {data?.map((workout) => (
          <TouchableOpacity key={workout.id}>
            <WorkoutDetailsCard workout={workout} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
