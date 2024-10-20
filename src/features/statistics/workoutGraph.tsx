import { ChevronDown } from "lucide-react-native";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export function WorkoutGraph() {
  // const data = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       data: [20, 45, 28, 80, 99, 43],
  //     },
  //   ],
  // };
  const screenWidth = Dimensions.get("window").width;

  // const chartConfig = {
  //   color: (opacity = 1) => `rgba(249, 115, 22 / ${opacity})`,
  //   barPercentage: 1,
  //   useShadowColorFromDataset: false,
  // };

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
        data={[
          {
            value: 20,
            frontColor: "#f97316",
            label: "Jan",
          },
          {
            value: 15,
            frontColor: "#f97316",
            label: "Fev",
          },
          {
            value: 25,
            frontColor: "#f97316",
            label: "Mar",
          },
          {
            value: 10,
            frontColor: "#f97316",
            label: "Abr",
          },
          {
            value: 18,
            frontColor: "#f97316",
            label: "Mai",
          },
        ]}
        barWidth={25}
      />
      {/* <BarChart
        style={{
          marginVertical: 8,
        }}
        yAxisSuffix=""
        data={data}
        width={screenWidth * 0.9}
        height={250}
        yAxisLabel=""
        chartConfig={{
          ...chartConfig,
          labelColor: (opacity = 1) => `rgba(255, 255, 255 / ${opacity})`,
        }}
        verticalLabelRotation={30}
      /> */}
    </View>
  );
}
