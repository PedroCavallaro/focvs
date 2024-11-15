import {
  ExerciseDto,
  MuscleDto,
  WorkoutDetails,
  WorkoutExercise,
} from "@/src/api/dtos";
import { BaseModal } from "@/src/components/baseModal";
import { AddExerciseModal } from "@/src/features/new-workout/forms/addExerciseModal";
import { ExercisePicker } from "@/src/features/new-workout/exercisePicker";
import { ExercisePickerCard } from "@/src/features/new-workout/exercisePIckerCard";
import { MuscleCard } from "@/src/features/new-workout/muscleCard";
import { MusclePicker } from "@/src/features/new-workout/musclePicker";
import { NewWorkoutForm } from "@/src/features/new-workout/forms/newWorkoutForm";
import { useModal } from "@/src/providers/modalProvider";
import { useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDrawer } from "@/src/providers/drawerProvider";
import { WorkoutSampling } from "@/src/features/new-workout/workoutSampling";
import { Button } from "@/src/components/button";
import { ArrowLeft, Search } from "lucide-react-native";
import { colors } from "@/src/style";
import { Input } from "@/src/components/input";
import { Drawer } from "@/src/components/drawer";
import { useWorkouConfiguration } from "./workout-configuration";
import { plural } from "@/src/utils";

export type ChangeWorkoutInfo =
  | { key: "day"; value: number }
  | { key: "name"; value: string };

type NewWorkoutProps = {
  updating: false;
  workout?: undefined;
};

type UpdateWorkoutProps = {
  updating: true;
  workout?: WorkoutDetails;
};

type WorkoutConfiguration = NewWorkoutProps | UpdateWorkoutProps;

export function WorkoutConfigurationTemplate({
  workout: workoutToUpdate,
  updating = false,
}: WorkoutConfiguration) {
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
    duplicatedExercise,
    refetchMuscles,
    fetchExercises,
    workout,
    setQuery,
    changeOnWorkoutSampling,
  } = useWorkouConfiguration(workoutToUpdate);

  const { closeDrawer, openDrawer } = useDrawer(() => {
    return (
      <Drawer
        title={updating ? "Atualizar treino" : "Novo Treino"}
        onClose={() => closeDrawer()}
      >
        <WorkoutSampling
          updating={updating}
          workout={workout}
          changeOnWorkoutSampling={changeOnWorkoutSampling}
          close={() => closeDrawer()}
        />
      </Drawer>
    );
  }, [workout, changeOnWorkoutSampling]);

  const { closeModal: closeAddExerciseModal, openModal: openAddExerciseModal } =
    useModal(
      (exercise: ExerciseDto) => {
        return (
          <BaseModal
            title={`${exercise.name}`}
            onClose={() => closeAddExerciseModal()}
          >
            <AddExerciseModal
              exercise={exercise}
              onClose={() => {
                closeAddExerciseModal();
              }}
              addExerciseToWorkout={(exercise) =>
                addExerciseToWorkout({ exercise })
              }
            />
          </BaseModal>
        );
      },
      [addExerciseToWorkout],
    );

  const { closeModal: closeOverrideModal, openModal: openOverrideModal } =
    useModal(
      (exercise: WorkoutExercise) => (
        <BaseModal
          positionVariant="center"
          sizeVariant="medium"
          onClose={() => closeOverrideModal()}
          subtitle="Deseja sobreescrever?"
          title="Exercício já adicionado"
        >
          <BaseModal.BaseButtons
            onClose={() => closeOverrideModal()}
            onOk={() => {
              addExerciseToWorkout({ exercise, shouldOverride: true });
              closeOverrideModal();
            }}
          />
        </BaseModal>
      ),
      [],
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

  useEffect(() => {
    if (duplicatedExercise) {
      openOverrideModal(duplicatedExercise);
    }
  }, [duplicatedExercise]);

  const getExerciseToConfigure = useCallback((exercise: ExerciseDto) => {
    if (!workoutToUpdate?.id) return exercise;

    const exerciseToUpdate = workoutToUpdate?.exercises.find(
      (e) => e.id === exercise.id,
    );

    if (!exerciseToUpdate?.id) {
      return exercise;
    }

    return exerciseToUpdate as ExerciseDto;
  }, []);

  return (
    <View className="flex-col gap-4">
      <View className="flex-col gap-8">
        <Text className="font-light text-lg text-white">
          {updating ? "Atualizar treino" : "Novo Treino"}
        </Text>
        <NewWorkoutForm
          initialValues={{ name: workout?.name, day: workout?.day }}
          changeValue={changeWorkoutInfo}
        />
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
              {updating
                ? `${workout?.exercises && workout.exercises.length} ${plural("exercício", workout?.exercises.length)}`
                : "Ver treino"}
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
                  <ExercisePickerCard
                    openModal={(exercise) =>
                      openAddExerciseModal(getExerciseToConfigure(exercise))
                    }
                    exercise={item}
                  />
                )}
              />
            </ScrollView>
          </ScrollView>
        </ExercisePicker>
      ) : (
        <MusclePicker loading={muscleLoading}>
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
export default {
  WorkoutConfigurationTemplate,
};