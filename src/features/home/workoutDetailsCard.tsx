import { View, Image, Text } from "react-native";
import { WorkoutDetails } from "../../api/dtos";
import { plural } from "../../utils/plural";

export function WorkoutDetailsCard({ workout }: { workout: WorkoutDetails }) {
  return (
    <View className="flex-row gap-2">
      <Image
        source={{ uri: workout.picture_url }}
        className="h-32 w-32 bg-white object-cover"
      />
      <View className="flex-col gap-2">
        <Text className="font-regular text-white">{workout.name}</Text>
        <Text className="font-regular text-white/70">
          {workout.exerciseAmount}{" "}
          {plural("exercicíco", workout.exerciseAmount)}
        </Text>
      </View>
    </View>
  );
}
