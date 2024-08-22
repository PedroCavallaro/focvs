import { View, Image, Text } from "react-native";
import { WorkoutDetails } from "../api/dtos";

export function WorkoutDetailsCard({ workout }: { workout: WorkoutDetails }) {
  return (
    <View className="flex-row gap-2">
      <Image
        source={{ uri: workout.picture_url }}
        className="h-32 w-32 bg-white object-cover"
      />
      <View className="flex-col">
        <Text className="font-regular text-white">{workout.name}</Text>
        <Text>{workout.total_exercises}</Text>
      </View>
    </View>
  );
}
