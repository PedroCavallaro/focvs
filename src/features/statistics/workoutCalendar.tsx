import { Calendar } from "@/src/components/calendar";
import { Text, View } from "react-native";

export function WorkoutCalendar() {
  return (
    <View className="flex-col gap-6">
      <Text className="text-lg text-white">Dias de treino realizados</Text>
      <Calendar
        markedDates={{
          "2024-10-20": {
            selected: true,
          },
        }}
      />
    </View>
  );
}
