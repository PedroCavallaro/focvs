import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export function EvolutionGraph() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="flex-col gap-6">
      <View className="flex-row items-center gap-4">
        <Text className="flex-row text-lg text-white">Gráfico de evolução</Text>
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
        data={[
          {
            value: 1,
            label: "Jan",
          },
          {
            value: 5,
            label: "Fev",
          },
          {
            value: 10,
            label: "Mar",
          },
          {
            value: 10,
            label: "Abr",
          },
          {
            value: 12,
            label: "Mai",
          },
        ]}
      />
    </View>
  );
}
