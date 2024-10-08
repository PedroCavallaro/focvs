import { Footer } from "@/src/components/footer";
import { Header } from "@/src/components/header";
import { WorkoutGraph } from "@/src/components/statistics/workoutGraph";
import { useAuth, useFooter } from "@/src/hooks";
import React from "react";
import { Animated, ScrollView } from "react-native";
import { View, Text } from "react-native";

export default function SearchPage() {
  const { animation, handleScroll } = useFooter();
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <ScrollView onScroll={handleScroll}>
        <Header />
        <View className="flex-col gap-4 px-2">
          <View>
            <Text className="font-light text-2xl text-white">
              Olá{" "}
              <Text className="font-medium text-2xl text-white">
                {user?.name}
              </Text>
            </Text>
          </View>
          <WorkoutGraph />
        </View>
      </ScrollView>

      <Animated.View style={animation}>
        <Footer />
      </Animated.View>
    </>
  );
}
