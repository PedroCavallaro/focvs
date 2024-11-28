import { api } from "@/src/api";
import { Evolution, ExerciseImprovement } from "@/src/api/dtos/statistics.dto";
import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { EvolutionGraph } from "@/src/features/statistics/evolutionGraph";
import { ExerciseEvolution } from "@/src/features/statistics/exerciseEvolution";
import { WorkoutCalendar } from "@/src/features/statistics/workoutCalendar";
import { WorkoutGraph } from "@/src/features/statistics/workoutGraph";
import { useAuth } from "@/src/hooks";
import { useQuery } from "@tanstack/react-query";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";

export default function Statistics() {
  const { user } = useAuth();

  const { data: statistics } = useQuery({
    queryKey: ["user-statistics"],
    queryFn: () => api.statistics.getAllStatics(),
  });

  return (
    <>
      <ScrollView>
        <Header />
        <View className="flex-col gap-10 px-2">
          <View className="flex-col gap-6">
            <Text className="font-light text-2xl text-white">
              Olá{" "}
              <Text className="font-medium text-2xl text-white">
                {user?.name}
              </Text>
            </Text>
            <WorkoutGraph data={statistics?.hours} />
          </View>
          <ExerciseEvolution
            data={statistics?.exerciseImprovements as ExerciseImprovement[]}
          />
          <EvolutionGraph data={statistics?.evolution as Evolution[]} />
          <WorkoutCalendar data={statistics?.dates as string[]} />
        </View>
      </ScrollView>

      <Footer />
    </>
  );
}
