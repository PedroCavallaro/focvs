import { api } from "@/src/api";
import { WorkoutDetailsCard } from "@/src/components/workoutDetailsCard";
import { colors } from "@/src/style";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { ArrowUpDown, Plus } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

export default function Workouts() {
  const router = useRouter();
  const { data: workouts } = useQuery({
    queryKey: ["user-workouts"],
    queryFn: () => api.workout.getUserWokouts(),
  });

  return (
    <View className="flex-col gap-8">
      <View className="flex-row justify-between">
        <Text className="font-regular text-2xl text-white">Meus Treinos</Text>
        <TouchableOpacity
          onPress={() => router.push("/new")}
          className="border-b-[0.7px] border-orange-500 text-white"
        >
          <Plus color={"#FFF"} size={25} />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-row items-center gap-2">
          <ArrowUpDown size={15} color={colors.zincBlur[700]} />
          <Text className="font-regular text-white/70">Ordenar</Text>
        </TouchableOpacity>
        <View></View>
      </View>
      <View className="flex flex-col gap-4">
        {workouts?.map((workout) => {
          return (
            <TouchableOpacity
              key={workout.id}
              onLongPress={() => console.log("oi")}
            >
              <WorkoutDetailsCard workout={workout} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
