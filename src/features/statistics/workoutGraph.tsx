import { ChevronDown } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

export function WorkoutGraph() {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  return (
    <View className="flex-col gap-4">
      <View className="flex-row items-center gap-4">
        <Text className="text-md flex-row text-white">
          Quantidade de treinos nos últimos
        </Text>
        <TouchableOpacity className="flex-row items-center gap-x-2 rounded-md bg-orange-500 p-1 px-2">
          <Text>12 meses</Text>
          <ChevronDown size={15} color={"#000"} />
        </TouchableOpacity>
      </View>
      <BarChart
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        yAxisSuffix="k"
        data={data}
        width={screenWidth}
        height={250}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />
    </View>
  );
}
