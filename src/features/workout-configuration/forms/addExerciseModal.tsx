import { ExerciseDto, ExerciseSet, WorkoutExercise } from "@/src/api/dtos";
import { View, Text } from "react-native";
import { Button } from "../../../components/button";
import { Check, Plus, Trash2 } from "lucide-react-native";
import { colors } from "@/src/style";
import { useCallback, useState } from "react";
import { SetRow } from "./setRow";

export type Set = ExerciseSet & {
  onDelete?: boolean;
};

function getInitialState(exercise: ExerciseDto): Set[] {
  if (exercise.sets?.length) {
    return exercise.sets.map((e) => ({ ...e, onDelete: false }));
  }

  return [
    {
      set_number: 1,
      onDelete: false,
      reps: 1,
      weight: 1,
    },
  ];
}

function orderSets(sets: Set[]) {
  return sets.map((e, i) => ({
    ...e,
    set_number: i + 1,
  }));
}

export function AddExerciseModal({
  exercise,
  addExerciseToWorkout,
  onClose,
}: {
  exercise: ExerciseDto;
  addExerciseToWorkout: (exercise: WorkoutExercise) => void;
  onClose?: () => void;
}) {
  const [deleteMode, setDeleteMode] = useState(false);
  const [sets, setSets] = useState<Set[]>(() => getInitialState(exercise));
  const [deletedSets, setDeletedSets] = useState<string[]>([]);

  const handleDeleteMode = useCallback(() => {
    setDeleteMode((prev) => !prev);
  }, [setDeleteMode]);

  const handleValueChange = useCallback(
    (i: number, val: number, key: keyof Set) => {
      if (key !== "onDelete") {
        const newSets = [...sets];

        if (key === "reps" || key === "weight") {
          newSets[i][key] = val;

          setSets(newSets);
        }
      }
    },
    [setSets, sets],
  );

  const handleDelete = useCallback(
    (i: number) => {
      const newSets = [...sets];

      if (sets[i]?.id) {
        setDeletedSets((prev) => [...prev, sets[i].id as string]);
      }

      newSets[i].onDelete = !sets[i]?.onDelete;

      setSets(newSets);
    },
    [setSets, sets],
  );

  const deleteSets = useCallback(() => {
    const newSets = sets.filter((s) => !s.onDelete);

    const reorderedSets = orderSets(newSets);

    setSets(reorderedSets);
  }, [setSets, sets]);

  const addNewSet = useCallback(() => {
    setSets(() => [
      ...sets,
      { set_number: sets.length + 1, reps: 1, weight: 1, onDelete: false },
    ]);
  }, [setSets, sets]);

  return (
    <>
      <View className="w-3/12 flex-row gap-2">
        <View className="w-2/4">
          {deleteMode ? (
            <Button
              onPress={() => {
                deleteSets();
                handleDeleteMode();
              }}
              className="h-10 items-center justify-center rounded-md border-b-[0.7px] border-red-700"
            >
              <Check size={20} color={colors.zincBlur[700]} />
            </Button>
          ) : (
            <Button
              onPress={handleDeleteMode}
              className="h-10 items-center justify-center rounded-md border-b-[0.7px] border-red-700"
            >
              <Trash2 size={20} color={colors.zincBlur[700]} />
            </Button>
          )}
        </View>
        <View className="w-2/4">
          <Button
            onPress={addNewSet}
            className="h-10 items-center justify-center rounded-md border-b-[0.7px] border-orange-500"
          >
            <Plus size={20} color={colors.zincBlur[700]} />
          </Button>
        </View>
      </View>
      <View className="flex w-full flex-col items-center gap-8 pt-6">
        <View className="flex flex-row gap-6">
          <View className="w-[2%]"></View>
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
        {sets.map((set, i) => {
          return (
            <SetRow
              key={i}
              handleDelete={handleDelete}
              handleValueChange={handleValueChange}
              deleteMode={deleteMode}
              i={i}
              set={set}
            />
          );
        })}
        <Button
          onPress={() => {
            addExerciseToWorkout({
              id: exercise.id,
              gif_url: exercise.gif_url,
              name: exercise.name,
              sets: sets.map((s) => {
                return {
                  id: s?.id,
                  reps: s.reps,
                  set_number: s.set_number,
                  weight: s.weight,
                } as ExerciseSet;
              }),
              deletedSets,
            });

            onClose?.();
          }}
        >
          <Button.Title>Adicionar ao treino</Button.Title>
        </Button>
      </View>
    </>
  );
}
