import { View, Text, TouchableOpacity } from "react-native";
import { Workout } from "../api/dtos";
import { Input } from "../components/input";
import { CheckBox } from "../components/checkbox";
import clsx from "clsx";
import { useCallback, useState } from "react";
import { useModal } from "../providers/modalProvider";
import { BaseModal } from "../components/baseModal";
import { RestTimer } from "./home/restimer/restTimer";
import { Image } from "expo-image";
import { ExerciseCardActions } from "./exerciseCardActions";

interface IExerciseCardProps {
  showCheckBox: boolean;
  exercise: Workout["exercises"][0];
  checkSets?: (exerciseId: string, setId: string) => void;
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
  shoulDecreaseOpacity?: boolean;
  shouldEditOneByOne?: boolean;
  shouldEditAllAtSame?: boolean;
  editable?: boolean;
  hasActions?: boolean;
}

export function ExerciseCard({
  editable,
  exercise,
  onChange,
  checkSets,
  showCheckBox = false,
  shoulDecreaseOpacity = false,
  shouldEditOneByOne = false,
  shouldEditAllAtSame = false,
  hasActions = false,
}: IExerciseCardProps) {
  const [currentSet, setCurrentSet] = useState(0);
  const [showActions, setShowActions] = useState(false);

  const { openModal: openTimerModal, closeModal: closeTimerModal } = useModal(
    () => (
      <BaseModal title="Tempo de descanso" onClose={() => closeTimerModal()}>
        <RestTimer />
      </BaseModal>
    ),
    [],
  );

  const handleActions = useCallback(() => {
    if (!hasActions) return;

    setShowActions((prev) => !prev);
  }, [hasActions]);

  const jumpToNextSet = useCallback(() => {
    setCurrentSet((prev) => prev + 1);
    openTimerModal();
  }, []);

  return (
    <View>
      <TouchableOpacity
        onLongPress={handleActions}
        activeOpacity={0.9}
        className="z-50 w-full flex-col gap-4"
      >
        <View className="flex-col gap-10 rounded-2xl bg-[#0f0f0f] p-4">
          <View className="flex-row gap-6">
            <View className="min-h-40 w-3/6 overflow-hidden rounded-xl bg-white">
              <Image
                style={{
                  height: 150,
                  width: "100%",
                  objectFit: "cover",
                }}
                source={exercise.gif_url}
              />
            </View>
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
                const isChecked = set?.done ?? false;
                const isInputEditble = !isChecked && editable;
                const editingOneByOne = shouldEditOneByOne
                  ? isInputEditble && i <= currentSet
                  : true;
                const ignoreDisableByIndex = shouldEditAllAtSame
                  ? true
                  : isInputEditble && i == currentSet;

                return (
                  <View
                    key={i}
                    className={clsx("flex-row gap-7", {
                      "opacity-60":
                        shoulDecreaseOpacity && (isChecked || i > currentSet),
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
                        variant={editingOneByOne ? "primary" : "no-border"}
                      >
                        <Input.Field
                          value={String(set.reps)}
                          editable={ignoreDisableByIndex}
                          keyboardType="numeric"
                          onChangeText={(v) =>
                            onChange?.({
                              type: "reps",
                              value: v,
                              setIndex: i,
                              exerciseId: exercise.id,
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
                        variant={editingOneByOne ? "primary" : "no-border"}
                      >
                        <Input.Field
                          keyboardType="numeric"
                          className="flex-1 text-center text-white"
                          value={String(set.weight)}
                          editable={ignoreDisableByIndex}
                          onChangeText={(v) =>
                            onChange?.({
                              type: "weight",
                              setIndex: i,
                              value: v,
                              exerciseId: exercise.id,
                            })
                          }
                        />
                        <Text className="text-white opacity-70">KG</Text>
                      </Input>
                    </View>
                    {showCheckBox && (
                      <View className="ml-4 mt-2">
                        <CheckBox
                          alreadyChecked={set?.done ?? false}
                          onCheck={() => {
                            checkSets?.(exercise.id, set.id ?? "");
                            jumpToNextSet();
                          }}
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
      </TouchableOpacity>

      <View className="mt-2">
        {showActions && <ExerciseCardActions handleActions={handleActions} />}
      </View>
    </View>
  );
}
