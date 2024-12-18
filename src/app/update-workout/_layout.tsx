import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { useFooter } from "@/src/hooks";
import { Slot } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Layout() {
  const { handleScroll } = useFooter();

  return (
    <View className="flex-1">
      <ScrollView onScroll={handleScroll}>
        <Header />

        <View className="px-2">
          <Slot />
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
