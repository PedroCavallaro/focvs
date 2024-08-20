import { View } from "react-native";

export function WorkoutOfTheDaySkeleton() {
  return (
    <View className="flex-col justify-between gap-10">
      <View className="flex-col gap-4">
        <View className="flex-row items-center justify-between gap-3">
          <View className="h-4 w-20 animate-pulse rounded-md bg-white/50"></View>
          <View className="h-4 w-20 animate-pulse rounded-md bg-white/50"></View>
        </View>
        <View className="h-6 w-32 animate-pulse rounded-md bg-white/50"></View>
      </View>
      <View className="h-44 w-full animate-pulse rounded-md bg-white/50"></View>
      <View className="h-44 w-full animate-pulse rounded-md bg-white/50"></View>
      <View className="h-44 w-full animate-pulse rounded-md bg-white/50"></View>
      <View className="h-44 w-full animate-pulse rounded-md bg-white/50"></View>
      <View className="h-44 w-full animate-pulse rounded-md bg-white/50"></View>
      <View className="h-44 w-full animate-pulse rounded-md bg-white/50"></View>
      <View className="h-44 w-full animate-pulse rounded-md bg-white/50"></View>
    </View>
  );
}
