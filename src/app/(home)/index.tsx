import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { NoWorkout } from "@/src/components/home/noWokout";
import { MusclePicker } from "@/src/components/new-workout/musclePicker";

export default function HomePage() {
  const router = useRouter();

  return (
    <View>
      <NoWorkout />
    </View>
  );
}
