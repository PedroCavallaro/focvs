import { View, Text, Image } from "react-native";
import { Workout } from "../api/dtos";
import { Input } from "../components/input";
import { CheckBox } from "../components/checkbox";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useModal } from "../providers/modalProvider";
import { BaseModal } from "../components/baseModal";
import { RestTimer } from "./home/restTimer";

interface IExerciseCardProps {
  showCheckBox: boolean;
  exercise: Workout["exercises"][0];
  onChange?: ({
    type,
    setIndex,
    value,
    exerciseId,
  }: {
    type: "reps" | "weight";
    value: string;
    setIndex: number;
    exerciseId: string;
  }) => void;
  editable?: boolean;
}

export function ExerciseCard({
  editable,
  exercise,
  onChange,
  showCheckBox = false,
}: IExerciseCardProps) {
  const [completedSets, setCompletedSets] = useState<Record<number, boolean>>(
    {},
  );
  const [currentSet, setCurrentSet] = useState(0);

  const { openModal: openTimerModal, closeModal: closeTimerModal } = useModal(
    () => (
      <BaseModal title="Tempo de descanso" onClose={() => closeTimerModal()}>
        <RestTimer />
      </BaseModal>
    ),
    [],
  );

  const checkSet = useCallback((i: number) => {
    setCompletedSets((prev) => ({ ...prev, [i]: true }));
    setCurrentSet((prev) => prev + 1);
    openTimerModal();
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
                  "opacity-60": isChecked || i > currentSet,
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
                    variant={
                      (isChecked || !editable) && i > currentSet
                        ? "no-border"
                        : "primary"
                    }
                  >
                    <Input.Field
                      value={String(set.reps)}
                      editable={!isChecked}
                      onChangeText={(v) =>
                        onChange?.({
                          type: "reps",
                          value: v,
                          setIndex: i,
                          exerciseId: exercise.exerciseId,
                        })
                      }
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
                    variant={
                      (isChecked || !editable) && i > currentSet
                        ? "no-border"
                        : "primary"
                    }
                  >
                    <Input.Field
                      keyboardType="numeric"
                      className="flex-1 text-center text-white"
                      value={String(set.weight)}
                      editable={(!isChecked || editable) && i <= currentSet}
                      onChangeText={(v) =>
                        onChange?.({
                          type: "weight",
                          setIndex: i,
                          value: v,
                          exerciseId: exercise.exerciseId,
                        })
                      }
                    />
                    <Text className="text-white opacity-70">KG</Text>
                  </Input>
                </View>
                {showCheckBox && (
                  <View className="ml-4 mt-2">
                    <CheckBox
                      onCheck={() => checkSet(i)}
                      disabled={isChecked || !editable}
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
