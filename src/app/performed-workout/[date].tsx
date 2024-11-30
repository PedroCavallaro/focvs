import { api } from "@/src/api";
import { ExerciseCard } from "@/src/features/exerciseCard/exerciseCard";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";

export default function WorkoutPage() {
  const { date } = useLocalSearchParams();

  const { data: workout } = useQuery({
    queryKey: [`workout/${date}`],
    queryFn: () => api.statistics.getPerformedWorkout(date as string),
  });

  const parsedDate = useMemo(() => {
    const [year, month, day] = String(date).split("-");

    return `${day}/${month}/${year}`;
  }, [date]);

  console.log(workout?.spentMinutes);

  return (
    <View className="flex-col gap-8">
      {workout && (
        <>
          <View className="flex-col gap-6">
            <View className="flex-col gap-6">
              <View className="flex-col gap-4">
                <View className="flex-col gap-4">
                  <Text className="font- text-2xl text-white">
                    {workout.name}
                  </Text>
                  <Text className="font-regular text-white">
                    Treino realizdo em: {parsedDate}
                  </Text>
                  <Text className="font-regular text-white">
                    Tempo total: {workout?.spentMinutes ?? 0} minutos
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="flex-col gap-8">
            {workout.exercises?.map((e, i) => {
              return (
                <ExerciseCard
                  exercise={e}
                  key={i}
                  editable={false}
                  shouldEditAllAtSame={true}
                  shouldEditOneByOne={true}
                  showCheckBox
                />
              );
            })}
          </View>
        </>
      )}
    </View>
  );
}
