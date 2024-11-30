import { Calendar } from "@/src/components/calendar";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { Text, View } from "react-native";

export function WorkoutCalendar({ data }: { data: string[] }) {
  const router = useRouter();

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
      <Calendar
        onDayPress={(date) =>
          router.push(`/performed-workout/${date.dateString}`)
        }
        markedDates={markedDates}
      />
    </View>
  );
}
