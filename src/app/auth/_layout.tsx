import { Slot } from "expo-router";
import { View, Text } from "react-native";

export default function Layout() {
  return (
    <View className="flex-1 flex-col items-center justify-end gap-20">
      <View className="flex-col items-center gap-2">
        <Text className="font-medium text-5xl leading-relaxed tracking-[0.2rem] text-white">
          FOC<Text className="font-medium text-orange-500">V</Text>S
        </Text>
      </View>
      <Slot />
    </View>
  );
}
