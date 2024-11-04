import { View, Image, Text } from "react-native";
import { WorkoutDetails } from "../../api/dtos";
import { plural } from "../../utils/plural";
import { Dumbbell, User } from "lucide-react-native";
import { colors } from "@/src/style";

export function WorkoutDetailsCard({
  workout,
  showUser = false,
}: {
  workout: WorkoutDetails;
  showUser?: boolean;
}) {
  return (
    <View className="flex-row gap-3">
      <View className="h-32 w-32 overflow-hidden rounded-lg bg-white">
        <Image
          source={{ uri: workout.picture_url }}
          className="h-32 w-32 object-cover"
        />
      </View>
      <View className="flex-col gap-4">
        <Text className="font-regular text-lg text-white">{workout.name}</Text>
        <View className="flex-col gap-2">
          {showUser && (
            <View className="flex-row gap-2">
              <User size={18} color={colors.orange[500]} />
              <Text className="font-regular text-white/60">
                {workout.user.name}
              </Text>
            </View>
          )}
          <View className="flex-row gap-2">
            <Dumbbell size={18} color={colors.orange[500]} />

            <Text className="font-regular text-white/70">
              {workout.exerciseAmount}{" "}
              {plural("exercicíco", workout.exerciseAmount)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
