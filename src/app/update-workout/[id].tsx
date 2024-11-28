import { api } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { WorkoutConfigurationTemplate } from "../__workout-configuration__/workoutConfigurationTemplate";
import { WorkoutConfigurationProvider } from "../__workout-configuration__/provider";

export default function UpdateWorkout() {
  const { id } = useLocalSearchParams();

  const { data: workout } = useQuery({
    queryKey: [`workout/${id}`],
    queryFn: () => api.workout.getFullWorkoutById(id as string),
  });

  return (
    <WorkoutConfigurationProvider workoutToUpdate={workout}>
      <WorkoutConfigurationTemplate updating={true} workout={workout} />
    </WorkoutConfigurationProvider>
  );
}
