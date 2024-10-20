import { api } from "@/src/api";
import { ExerciseCard } from "@/src/features/exerciseCard";
import { WorkoutSumary } from "@/src/features/workout/workoutSummary";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function WorkoutPage() {
  const { id } = useLocalSearchParams();

  const { data: workout } = useQuery({
    queryKey: [`workout/${id}`],
    queryFn: () => api.workout.getFullWorkoutById(id as string),
  });

  return (
    <View className="flex-col gap-10">
      {workout && (
        <>
          <WorkoutSumary workout={workout} />

          <View className="h-[0.7px] bg-white opacity-40" />
          <View className="flex-col gap-8">
            {workout.exercises?.map((e, i) => {
              return (
                <ExerciseCard
                  exercise={e}
                  key={i}
                  editable={false}
                  shouldEditAllAtSame={true}
                  shouldEditOneByOne={true}
                  showCheckBox={false}
                />
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}
