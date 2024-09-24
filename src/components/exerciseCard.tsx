import { View, Text, Image } from "react-native";
import { Workout } from "../api/dtos";
import { Input } from "./input";
import { CheckBox } from "./checkbox";
import clsx from "clsx";
import { useCallback, useState } from "react";

export function ExerciseCard({
  editable,
  exercise,
  onChange,
  showCheckBox = false,
}: {
  showCheckBox: boolean;
  exercise: Workout["exercises"][0];
  onChange?: (key: "reps" | "weight", v: string) => void;
  editable?: number;
}) {
  const [completedSets, setCompletedSets] = useState<Record<number, boolean>>(
    {},
  );

  const checkSet = useCallback((i: number) => {
    setCompletedSets((prev) => ({ ...prev, [i]: true }));
  }, []);

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
          <View className="flex-row gap-6">
            <Text className="w-2/12 text-center font-regular text-lg text-white opacity-80">
              Série
            </Text>
            <Text
              className={clsx(
                "text-center font-regular text-lg text-white opacity-80",
                {
                  "w-3/12": showCheckBox,
                  "w-2/5": !showCheckBox,
                },
              )}
            >
              Repetições
            </Text>
            <Text
              className={clsx(
                "text-center font-regular text-lg text-white opacity-80",
                {
                  "w-3/12": showCheckBox,
                  "w-2/12": !showCheckBox,
                },
              )}
            >
              Peso
            </Text>
            {showCheckBox && (
              <Text className="w-[13%] text-center font-regular text-lg text-white opacity-80">
                Feito
              </Text>
            )}
          </View>
          {exercise.sets.map((set, i) => {
            const isChecked = completedSets?.[i];

            return (
              <View
                key={i}
                className={clsx("flex-row gap-7", {
                  "opacity-60": isChecked,
                })}
              >
                <View className="w-2/12">
                  <Input variant={"no-border"}>
                    <Input.Field
                      editable={false}
                      className="text-center font-regular text-white"
                      value={String(set.set_number)}
                    />
                  </Input>
                </View>
                <View
                  className={clsx("", {
                    "w-3/12": showCheckBox,
                    "w-2/6": !showCheckBox,
                  })}
                >
                  <Input
                    variant={!editable || isChecked ? "no-border" : "primary"}
                  >
                    <Input.Field
                      value={String(set.reps)}
                      editable={!isChecked}
                      onChangeText={(v) => onChange?.("reps", v)}
                      className="text-center font-regular text-white"
                    />
                  </Input>
                </View>
                <View
                  className={clsx("flex-row", {
                    "w-3/12": showCheckBox,
                    "w-2/6": !showCheckBox,
                  })}
                >
                  <Input
                    variant={!editable || isChecked ? "no-border" : "primary"}
                  >
                    <Input.Field
                      keyboardType="numeric"
                      className="flex-1 text-center text-white"
                      value={String(set.weight)}
                      editable={!isChecked || !editable}
                      onChangeText={(v) => onChange?.("weight", v)}
                    />
                    <Text className="text-white opacity-70">KG</Text>
                  </Input>
                </View>
                {showCheckBox && editable && (
                  <View className="ml-4 mt-2">
                    <CheckBox
                      onCheck={() => checkSet(i)}
                      disabled={isChecked}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
