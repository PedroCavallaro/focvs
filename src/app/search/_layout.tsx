import { Footer } from "@/src/components/footer";
import { useFooter } from "@/src/hooks";
import { Slot } from "expo-router";
import { Animated, ScrollView, View } from "react-native";

export default function Layout() {
  const { animation, handleScroll } = useFooter();

  return (
    <View className="flex-1">
      <ScrollView onScroll={handleScroll}>
        <Slot />
      </ScrollView>
      <Animated.View style={animation}>
        <Footer />
      </Animated.View>
    </View>
  );
}
