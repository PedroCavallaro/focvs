import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { useFooter } from "@/src/hooks";
import { Slot } from "expo-router";
import { Animated, ScrollView, View } from "react-native";

export default function Layout() {
  const { animation, handleScroll } = useFooter();

  return (
    <View className="flex-1">
      <ScrollView onScroll={handleScroll}>
        <Header />

        <View className="px-2">
          <Slot />
        </View>
      </ScrollView>

      <Animated.View style={animation}>
        <Footer />
      </Animated.View>
    </View>
  );
}
