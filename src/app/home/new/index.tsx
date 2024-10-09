import { ExerciseDto, MuscleDto } from "@/src/api/dtos";
import { BaseModal } from "@/src/components/baseModal";
import { AddExerciseModal } from "@/src/features/new-workout/forms/addExerciseModal";
import { ExercisePicker } from "@/src/features/new-workout/exercisePicker";
import { ExercisePickerCard } from "@/src/features/new-workout/exercisePIckerCard";
import { MuscleCard } from "@/src/features/new-workout/muscleCard";
import { MusclePicker } from "@/src/features/new-workout/musclePicker";
import { NewWorkoutForm } from "@/src/features/new-workout/forms/newWorkoutForm";
import { useModal } from "@/src/providers/modalProvider";
import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDrawer } from "@/src/providers/drawerProvider";
import { Drawer } from "@/src/components/drawer";
import { WorkoutSampling } from "@/src/features/new-workout/workoutSampling";
import { Button } from "@/src/components/button";
import { ArrowLeft, Search } from "lucide-react-native";
import { colors } from "@/src/style";
import { Input } from "@/src/components/input";
import { useNewWorkout } from "./new-workout";

export type ChangeWorkoutInfo =
  | { key: "day"; value: number }
  | { key: "name"; value: string };

export default function NewWorkout() {
  const {
    addExerciseToWorkout,
    changeWorkoutInfo,
    exerciseLoading,
    exercises,
    selectedMuscle,
    handleSelectMuscle,
    muscleLoading,
    muscles,
    query,
    refetchExercises,
    refetchMuscles,
    fetchExercises,
    workout,
    setQuery,
  } = useNewWorkout();

  const { closeDrawer, openDrawer } = useDrawer(() => {
    return (
      <Drawer title="Novo Treino" onClose={() => closeDrawer()}>
        <WorkoutSampling close={() => closeDrawer()} workout={workout} />
      </Drawer>
    );
  }, [workout]);

  const { closeModal, openModal } = useModal(
    (exercise: ExerciseDto) => {
      return (
        <BaseModal title={`${exercise.name}`} onClose={() => closeModal()}>
          <AddExerciseModal
            exercise={exercise}
            onClose={() => {
              closeModal();
            }}
            addExerciseToWorkout={addExerciseToWorkout}
          />
        </BaseModal>
      );
    },
    [addExerciseToWorkout],
  );

  useEffect(() => {
    fetchExercises();
  }, [selectedMuscle]);

  useEffect(() => {
    if (selectedMuscle.id) {
      refetchExercises();

      return;
    }

    refetchMuscles();

    return;
  }, [query, selectedMuscle]);

  return (
    <View className="flex-col gap-4">
      <View className="flex-col gap-8">
        <Text className="font-light text-lg text-white">Novo treino</Text>
        <NewWorkoutForm changeValue={changeWorkoutInfo} />
        <View className="flex-row items-center justify-between gap-2">
          <View className="w-3/6">
            <View>
              {selectedMuscle?.id ? (
                <TouchableOpacity
                  onPress={() => handleSelectMuscle({} as MuscleDto)}
                  className="flex-row items-center gap-2 font-light text-lg text-white opacity-70"
                >
                  <ArrowLeft size={20} color={colors.orange[500]} />
                  <Text className="relative font-light text-lg text-white opacity-70">
                    Voltar
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text className="font-light text-lg text-white opacity-70">
                  Selecione o músculo
                </Text>
              )}
            </View>
          </View>
          <Button
            onPress={openDrawer}
            className="h-10 w-11/12 justify-center rounded-lg bg-orange-500 p-2"
          >
            <Text className="text-md ml-16 font-medium text-black">
              Ver treino
            </Text>
          </Button>
        </View>
      </View>
      <Input>
        <Search size={13} color={colors.orange[500]} />
        <Input.Field
          onChangeText={(v) => setQuery(v)}
          placeholder="Pesquisar muscúlo"
        />
      </Input>
      {selectedMuscle?.id ? (
        <ExercisePicker
          loading={exerciseLoading}
          muscleName={selectedMuscle.name}
          openDrawer={openDrawer}
        >
          <ScrollView>
            <ScrollView horizontal className="flex-row flex-wrap gap-8">
              <FlatList
                data={exercises?.data}
                numColumns={2}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <ExercisePickerCard openModal={openModal} exercise={item} />
                )}
              />
            </ScrollView>
          </ScrollView>
        </ExercisePicker>
      ) : (
        <MusclePicker openDrawer={openDrawer} loading={muscleLoading}>
          <ScrollView horizontal className="flex-row flex-wrap gap-8">
            <FlatList
              data={muscles}
              numColumns={2}
              keyExtractor={(item) => String(item.id)}
              renderItem={({ item }) => (
                <MuscleCard
                  muscle={item}
                  handleSelectMuscle={handleSelectMuscle}
                />
              )}
            />
          </ScrollView>
        </MusclePicker>
      )}
    </View>
  );
}
