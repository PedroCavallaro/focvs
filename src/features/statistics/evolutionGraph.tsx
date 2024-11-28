import { Evolution } from "@/src/api/dtos/statistics.dto";
import { colors } from "@/src/style";
import { CircleHelp } from "lucide-react-native";
import { useMemo } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export function EvolutionGraph({ data }: { data: Evolution[] }) {
  const screenWidth = Dimensions.get("window").width;

  const parsedData = useMemo(
    () =>
      data?.map((e) => ({
        ...e,
        value: parseFloat(e.volume),
      })),

    [data],
  );

  return (
    <View className="flex-col gap-6">
      <View className="flex-row items-center gap-3">
        <Text className="flex-row text-lg text-white">Gráfico de evolução</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <CircleHelp size={18} color={colors.orange[500]} />
        </TouchableOpacity>
      </View>
      <LineChart
        width={screenWidth - 90}
        height={200}
        noOfSections={4}
        yAxisThickness={1}
        xAxisThickness={1}
        isAnimated
        animationDuration={300}
        yAxisTextStyle={{
          color: "white",
        }}
        color="#f97316"
        dashGap={30}
        hideRules
        hideYAxisText
        yAxisColor="white"
        xAxisColor="white"
        dataPointsColor="#FFF"
        xAxisLabelTextStyle={{ color: "white" }}
        data={parsedData}
      />
    </View>
  );
}
