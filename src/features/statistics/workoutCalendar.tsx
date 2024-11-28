import { Calendar } from "@/src/components/calendar";
import { useMemo } from "react";
import { Text, View } from "react-native";

export function WorkoutCalendar({ data }: { data: string[] }) {
  const markedDates = useMemo(() => {
    let datesMap = {};

    data?.map(
      (d) =>
        (datesMap = {
          ...datesMap,
          [d]: {
            selected: true,
          },
        }),
    );

    return datesMap;
  }, [data]);

  return (
    <View className="flex-col gap-6">
      <Text className="font-medium text-lg text-white">
        Dias de treino realizados
      </Text>
      <Calendar markedDates={markedDates} />
    </View>
  );
}
