import { ChartLine, Home, Search } from "lucide-react-native";
import { View } from "react-native";
import { router, usePathname } from "expo-router";
import { Button } from "./button";
import { colors } from "../style";

export function Footer() {
  const route = usePathname() as "/" | "/(home)" | "/statistics" | "/search";

  return (
    <View className="absolute bottom-5 flex w-full items-center justify-center">
      <View className="z-10 h-20 w-4/5 flex-row items-center justify-around rounded-2xl bg-zinc-950">
        <Button
          onPress={() => router.push("/(home)")}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            route === "/" ? "opacity-100" : "opacity-50"
          }`}
        >
          <Home size={25} color={colors.orange[500]} />
        </Button>
        <Button
          onPress={() => router.push("/search")}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            route === "/search" ? "opacity-100" : "opacity-50"
          }`}
        >
          <Search size={25} color={colors.orange[500]} />
        </Button>
        <Button
          onPress={() => router.push("/statistics")}
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            route === "/statistics" ? "opacity-100" : "opacity-50"
          }`}
        >
          <ChartLine size={25} color={colors.orange[500]} />
        </Button>
      </View>
    </View>
  );
}
