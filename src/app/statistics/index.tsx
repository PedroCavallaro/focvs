import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { EvolutionGraph } from "@/src/features/statistics/evolutionGraph";
import { ExerciseEvolution } from "@/src/features/statistics/exerciseEvolution";
import { WorkoutCalendar } from "@/src/features/statistics/workoutCalendar";
import { WorkoutGraph } from "@/src/features/statistics/workoutGraph";
import { useAuth, useFooter } from "@/src/hooks";
import { Animated, ScrollView } from "react-native";
import { View, Text } from "react-native";

export default function SearchPage() {
  const { animation, handleScroll } = useFooter();
  const { user } = useAuth();

  return (
    <>
      <ScrollView onScroll={handleScroll}>
        <Header />
        <View className="flex-col gap-10 px-2">
          <View className="flex-col gap-6">
            <Text className="font-light text-2xl text-white">
              Olá{" "}
              <Text className="font-medium text-2xl text-white">
                {user?.name}
              </Text>
            </Text>
            <WorkoutGraph />
          </View>
          <ExerciseEvolution />
          <EvolutionGraph />
          <WorkoutCalendar />
        </View>
      </ScrollView>

      <Footer />
    </>
  );
}
