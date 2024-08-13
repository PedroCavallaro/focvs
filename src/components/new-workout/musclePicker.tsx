import { useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Button } from "../button";
import { MuscleCard } from "./muscleCard";

export function MusclePicker() {
  const [muscle, setMuscle] = useState();

  return (
    <View className="flex-col gap-4">
      <View className="flex-row items-center justify-between gap-10">
        <View className="flex-col">
          <View>
            <Text className="relative text-lg font-light text-white opacity-70">
              Selecione o Músculo
            </Text>
          </View>
        </View>
        <Button className="relative h-10 w-full justify-center rounded-lg bg-orange-500 p-2">
          <Text className="text-md text-black">20 exercicios adicionados</Text>
        </Button>
      </View>
      <ScrollView horizontal className="flex-row flex-wrap gap-8">
        <FlatList
          data={[
            {
              id: 1,
              name: "a",
            },
            {
              id: 2,
              name: "a",
            },
            {
              id: 3,
              name: "a",
            },
          ]}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <MuscleCard />}
        />
      </ScrollView>
    </View>
  );
}
