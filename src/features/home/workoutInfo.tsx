import { Workout } from "@/src/api/dtos/workout.dto";
import { DayOfWeek, daysOfWeek } from "@/src/utils";
import { ArrowLeftRight } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

export function WorkoutInfo({ name }: Workout) {
  return (
    <View className="felx-col gap-6">
      <View className="flex-row items-center justify-between">
        <Text className="font-light text-lg text-white opacity-80">
          {daysOfWeek[new Date().getDay() as DayOfWeek]}
        </Text>
        <TouchableOpacity className="flex-col gap-1">
          <Text className="font-light text-lg text-white opacity-80">
            Ver todos
          </Text>
          <View className="h-[0.4px] bg-orange-500" />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center gap-2">
        <Text className="font-medium text-3xl text-white">{name}</Text>
        <TouchableOpacity className="rounded-full bg-orange-500 p-2">
          <ArrowLeftRight size={15} color={"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
