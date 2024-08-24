import { Workout, WorkoutDetails } from "@/src/api/dtos";
import { colors } from "@/src/style";
import { Copy, Share2 } from "lucide-react-native";
import { Image, Text, View } from "react-native";

export function WorkoutSumary({
  workout,
}: {
  workout: Workout & WorkoutDetails;
}) {
  return (
    <View className="flex-row gap-4">
      <Image
        source={{ uri: workout.picture_url }}
        className="h-48 w-52 bg-white"
      />
      <View className="flex-col gap-8">
        <View className="flex-col gap-4">
          <Text className="font-medium text-white">{workout.name}</Text>
          <Text className="text-white opacity-70">
            De: {workout?.user?.name}
          </Text>
        </View>
        <View className="flex-row gap-4">
          <Copy color={colors.orange[500]} />
          <Share2 color={colors.orange[500]} />
        </View>
      </View>
    </View>
  );
}
