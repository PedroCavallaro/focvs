import { Calendar } from "@/src/components/calendar";
import { Text, View } from "react-native";

export function WorkoutCalendar() {
  return (
    <View className="flex-col gap-6">
      <Text className="font-medium text-lg text-white">
        Dias de treino realizados
      </Text>
      <Calendar
        markedDates={{
          "2024-10-20": {
            selected: true,
          },
          "2024-10-19": {
            selected: true,
          },
          "2024-10-18": {
            selected: true,
          },
          "2024-10-17": {
            selected: true,
          },
          "2024-10-16": {
            selected: true,
          },
          "2024-10-15": {
            selected: true,
          },
          "2024-10-14": {
            selected: true,
          },
          "2024-10-12": {
            selected: true,
          },
          "2024-10-11": {
            selected: true,
          },
          "2024-10-10": {
            selected: true,
          },
          "2024-10-09": {
            selected: true,
          },
          "2024-10-08": {
            selected: true,
          },
          "2024-10-07": {
            selected: true,
          },
          "2024-10-04": {
            selected: true,
          },
        }}
      />
    </View>
  );
}
