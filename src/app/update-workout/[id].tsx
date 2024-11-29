import { api } from "@/src/api";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { WorkoutConfigurationTemplate } from "../__workout-configuration__/workoutConfigurationTemplate";

export default function UpdateWorkout() {
  const { id } = useLocalSearchParams();

  const { data: workout } = useQuery({
    queryKey: [`workout/${id}`],
    queryFn: () => api.workout.getFullWorkoutById(id as string),
  });

  return <WorkoutConfigurationTemplate updating={true} workout={workout} />;
}
