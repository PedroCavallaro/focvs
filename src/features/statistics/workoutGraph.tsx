import { WorkoutHoursResponse } from "@/src/api/dtos/statistics.dto";
import { ChevronDown } from "lucide-react-native";
import { useMemo } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export function WorkoutGraph({ data }: { data?: WorkoutHoursResponse[] }) {
  const barData = useMemo(
    () =>
      data?.map((e) => ({
        ...e,
        frontColor: "#f97316",
      })),
    [data],
  );

  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="flex-col gap-6">
      <View className="flex-row items-center gap-4">
        <Text className="flex-row text-lg text-white">
          Quantidade de treinos nos últimos
        </Text>
        <TouchableOpacity className="flex-row items-center gap-x-2 rounded-md bg-orange-500 p-1 px-2">
          <Text>6 meses</Text>
          <ChevronDown size={15} color={"#000"} />
        </TouchableOpacity>
      </View>
      <BarChart
        width={screenWidth - 90}
        height={200}
        minHeight={3}
        noOfSections={4}
        yAxisThickness={1}
        xAxisThickness={1}
        isAnimated
        animationDuration={300}
        yAxisTextStyle={{
          color: "white",
        }}
        dashGap={30}
        hideRules
        yAxisColor="white"
        xAxisColor="white"
        barBorderRadius={3}
        xAxisLabelTextStyle={{ color: "white" }}
        data={barData}
        barWidth={25}
      />
    </View>
  );
}
