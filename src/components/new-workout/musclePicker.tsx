import { ReactNode, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { Button } from "../button";

export function MusclePicker({children}: {children: ReactNode}) {
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
      {children}
    </View>
  );
}
