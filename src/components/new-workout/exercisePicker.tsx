import { View, Text } from "lucide-react-native";
import { ReactNode } from "react";
import { Button } from "../button";

export function ExercisePicker({children, muscleName} : {children: ReactNode, muscleName: string}) {


    return (
        <View className="flex-col gap-4">
      <View className="flex-row items-center justify-between gap-10">
        <View className="flex-col">
          <View>
            <Text className="relative text-lg font-light text-white opacity-70">
              Vendo exercicios de {muscleName}
            </Text>
          </View>
        </View>
        <Button className="relative h-10 w-full justify-center rounded-lg bg-orange-500 p-2">
          <Text className="text-md text-black">20 exercicios adicionados</Text>
        </Button>
      </View>
      {children}
    </View>
    )
}