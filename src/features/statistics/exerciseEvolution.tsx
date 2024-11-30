import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { ExerciseImprovement } from "@/src/api/dtos/statistics.dto";
import { useMemo } from "react";

export function ExerciseEvolution({ data }: { data: ExerciseImprovement[] }) {
  const parsedData = useMemo(
    () => (data?.length && data.length > 0 ? data : []),
    [data],
  );

  return (
    <View className="flex-col gap-6">
      <Text className="font-medium text-lg text-white">
        Últimas evoluções de carga
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator className="">
        <View className="flex-row gap-10">
          {parsedData?.map((e, i) => {
            console.log(e);

            return (
              <View key={i} className="flex-row gap-4">
                {e?.exercise && (
                  <>
                    <Image
                      source={e?.exercise?.gif_url}
                      style={{
                        height: 80,
                        width: 80,
                        objectFit: "cover",
                        backgroundColor: "#FFF",
                      }}
                    />
                    <View className="flex-col gap-4">
                      <Text className="text-white">{e.exercise.name}</Text>
                      <Text className="font-light text-white">
                        {`${e?.oldPr?.weight}kg`} {"->"} {`${e.pr.weight}kg`}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}
