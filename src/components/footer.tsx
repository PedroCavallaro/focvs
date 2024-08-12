import { ChartLine, Home, Search } from "lucide-react-native";
import { View } from "react-native";
import { router, usePathname } from "expo-router";
import { Button } from "./button";
import { colors } from "../style";

export function Footer() {
  const route = usePathname() as "/" | "/statistics" | "/search";

  return (
    <View className="absolute w-full flex items-center justify-center bottom-5">
      <View className="w-4/5 h-20 flex-row items-center justify-around  rounded-2xl bg-zinc-950 z-10 ">
        <Button
          onPress={() => router.push("/")}
          className={`w-12 h-12 rounded-2xl  flex items-center justify-center ${
            route === "/" ? "opacity-100" : "opacity-50"
          }`}
        >
          <Home size={25} color={colors.orange[500]} />
        </Button>
        <Button
          onPress={() => router.push("/search")}
          className={`w-12 h-12 rounded-2xl  flex items-center justify-center ${
            route === "/search" ? "opacity-100" : "opacity-50"
          }`}
        >
          <Search size={25} color={colors.orange[500]} />
        </Button>
        <Button
          onPress={() => router.push("/statistics")}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            route === "/statistics" ? "opacity-100" : "opacity-50"
          }`}
        >
          <ChartLine size={25} color={colors.orange[500]} />
        </Button>
      </View>
    </View>
  );
}
