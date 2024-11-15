import { ChartLine, Home, Search } from "lucide-react-native";
import { View } from "react-native";
import { router, usePathname } from "expo-router";
import { Button } from "./button";
import { colors } from "../style";
import { RestTimerIndicator } from "../features/home/restimer/restTimerIndicator";
import { useRestTimer } from "../providers/restTimerProvider";

export function Footer() {
  const route = usePathname() as "/" | "/home" | "/statistics" | "/search";
  const { restTimer } = useRestTimer();

  return (
    <View className="relative w-full">
      {restTimer?.isTimerRunning && (
        <View className="relative">
          <View className="absolute -top-12 left-96 mb-2 h-full w-full rounded-lg bg-red-500">
            <RestTimerIndicator />
          </View>
        </View>
      )}
      <View className="z-10 flex w-full items-center justify-center border-t-[1px] border-t-white/20 bg-black">
        <View className="w-full flex-row items-center justify-around rounded-2xl py-3">
          <Button
            onPress={() => router.push("/home")}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              route === "/home" ? "opacity-100" : "opacity-50"
            }`}
          >
            <Home size={22} color={colors.orange[500]} />
          </Button>
          <Button
            onPress={() => router.push("/search")}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              route === "/search" ? "opacity-100" : "opacity-50"
            }`}
          >
            <Search size={22} color={colors.orange[500]} />
          </Button>
          <Button
            onPress={() => router.push("/statistics")}
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              route === "/statistics" ? "opacity-100" : "opacity-50"
            }`}
          >
            <ChartLine size={22} color={colors.orange[500]} />
          </Button>
        </View>
      </View>
    </View>
  );
}
