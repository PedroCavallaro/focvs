import { Input } from "@/src/components/input";
import { colors } from "@/src/style";
import { Search } from "lucide-react-native";
import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import { WorkoutDetailsCard } from "@/src/features/home/workoutDetailsCard";
import { router } from "expo-router";
import { useSearch } from "@/src/hooks/search";
import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";

export default function SearchPage() {
  const { fetchWorkouts, query, workouts, handleScroll, animation, setQuery } =
    useSearch();

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts, query]);

  return (
    <>
      <ScrollView onScroll={handleScroll}>
        <Header />
        <View className="px-2">
          <View className="flex-col gap-10">
            <View className="flex-col gap-6">
              <Text className="font-regular text-lg text-white">
                Pesquisar treinos
              </Text>
              <Input>
                <View className="flex-row justify-between">
                  <Input.Field
                    placeholder="Treino de costas"
                    onChangeText={(v) =>
                      setQuery((prev) => ({ ...prev, q: v }))
                    }
                  />
                  <Search size={16} color={colors.orange[500]} />
                </View>
              </Input>
            </View>
            <View className="flex flex-col gap-8">
              {workouts?.data.map((workout) => {
                return (
                  <TouchableOpacity
                    key={workout.id}
                    onPress={() => router.push(`/workout/${workout.id}`)}
                  >
                    <WorkoutDetailsCard workout={workout} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
      <Animated.View style={animation}>
        <Footer />
      </Animated.View>
    </>
  );
}
