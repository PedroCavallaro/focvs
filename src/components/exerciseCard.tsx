import { View, Text, Image } from "react-native";
import { Workout } from "../api/dtos";
import { Input } from "./input";

export function ExerciseCard({
  editable,
  exercise,
}: {
  editable?: boolean;
  exercise: Workout["exercises"][0];
}) {
  return (
    <View className="flex-col gap-10 border-b-[0.4px] border-white">
      <View className="flex-row gap-6">
        <Image
          source={{ uri: exercise.gif_url }}
          className="h-44 w-3/6 bg-white object-cover"
        />
        <View>
          <Text className="mb-5 font-medium text-lg text-white">
            {exercise.name}
          </Text>
        </View>
      </View>
      <View className="mb-4">
        <View className="flex-col">
          <View className="flex flex-row gap-6">
            <Text className="w-2/12 text-center font-regular text-lg text-white opacity-80">
              Série
            </Text>
            <Text className="w-2/6 text-center font-regular text-lg text-white opacity-80">
              Repetições
            </Text>
            <Text className="w-2/6 text-center font-regular text-lg text-white opacity-80">
              Peso
            </Text>
          </View>
          {exercise.sets.map((set, i) => {
            return (
              <View key={i} className="flex-row gap-7">
                <View className="w-2/12">
                  <Input variant={"no-border"}>
                    <Input.Field
                      editable={false}
                      className="text-center font-regular text-white"
                      value={String(set.set_number)}
                    />
                  </Input>
                </View>
                <View className="w-2/6">
                  <Input variant={!editable ? "no-border" : "primary"}>
                    <Input.Field
                      value={String(set.reps)}
                      className="text-center font-regular text-white"
                    />
                  </Input>
                </View>
                <View className="w-2/6 flex-row">
                  <Input variant={!editable ? "no-border" : "primary"}>
                    <Input.Field
                      keyboardType="numeric"
                      className="flex-1 text-center text-white"
                      value={String(set.weight)}
                    />
                    <Text className="text-white opacity-70">KG</Text>
                  </Input>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
