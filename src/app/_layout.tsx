import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
import "react-native-reanimated";
import "./global.css";
import {
  Mulish_300Light,
  Mulish_500Medium,
  Mulish_400Regular,
  useFonts,
} from "@expo-google-fonts/mulish";
import { Providers } from "../providers";
export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const [loaded, _] = useFonts({
    Mulish_300Light,
    Mulish_500Medium,
    Mulish_400Regular,
  });

  if (!loaded) {
    return;
  }

  return (
    <Providers>
      <StatusBar
        barStyle="light-content"
        backgroundColor={"#000"}
        translucent
      />
      <View className="flex-1 bg-black">
        <Slot />
      </View>
    </Providers>
  );
}
