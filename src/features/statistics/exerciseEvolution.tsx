import { Image, ScrollView, Text, View } from "react-native";

export function ExerciseEvolution() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator className="">
      <View className="flex-col gap-6">
        <Text className="font-medium text-lg text-white">
          Últimas evoluções de carga
        </Text>
        <View className="flex-row gap-10">
          <View className="flex-row gap-4">
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/d8/1b/47/d81b4799318a6b03520967910cbbc66d.gif",
              }}
              className="h-20 w-20 bg-white"
            />
            <View className="flex-col gap-4">
              <Text className="text-white">Supino Reto</Text>
              <Text className="font-light text-white">32kg {"->"} 35kg</Text>
            </View>
          </View>
          <View className="flex-row gap-4">
            <Image
              source={{
                uri: "https://gymvisual.com/img/p/5/6/8/3/5683.gif",
              }}
              className="h-20 w-20 bg-white"
            />
            <View className="flex-col gap-4">
              <Text className="text-white">Barra</Text>
              <Text className="font-light text-white">32kg {"->"} 35kg</Text>
            </View>
          </View>
          <View className="flex-row gap-4">
            <Image
              source={{
                uri: "https://gymvisual.com/img/p/5/6/8/3/5683.gif",
              }}
              className="h-20 w-20 bg-white"
            />
            <View className="flex-col gap-4">
              <Text className="text-white">Barra</Text>
              <Text className="font-light text-white">32kg {"->"} 35kg</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
