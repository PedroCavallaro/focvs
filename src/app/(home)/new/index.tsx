import { api } from "@/src/api";
import {
  ExerciseDto,
  MuscleDto,
  AddExerciseSchema,
  SaveWorkoutDTO,
  WorkoutExercise,
} from "@/src/api/dtos";
import { BaseModal } from "@/src/components/baseModal";
import { AddExerciseModal } from "@/src/components/new-workout/forms/addExerciseModal";
import { ExercisePicker } from "@/src/components/new-workout/exercisePicker";
import { ExercisePickerCard } from "@/src/components/new-workout/exercisePIckerCard";
import { MuscleCard } from "@/src/components/new-workout/muscleCard";
import { MusclePicker } from "@/src/components/new-workout/musclePicker";
import { NewWorkoutForm } from "@/src/components/new-workout/forms/newWorkoutForm";
import { useCallbackPlus, useLoading } from "@/src/hooks";
import { useModal } from "@/src/providers/ModalProvider";
import { PaginationDTO } from "@/src/utils/pagination";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDrawer } from "@/src/providers/DrawerProvider";
import { Drawer } from "@/src/components/drawer";
import { WorkoutSampling } from "@/src/components/new-workout/workoutSampling";
import { Button } from "@/src/components/button";
import { ArrowLeft } from "lucide-react-native";
import { colors } from "@/src/style";

export type ChangeWorkoutInfo =
  | { key: "day"; value: number }
  | { key: "name"; value: string };

export default function NewWorkout() {
  const [muscles, setMuscles] = useState<MuscleDto[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleDto>(
    {} as MuscleDto,
  );
  const [exercises, setExercises] = useState<PaginationDTO<ExerciseDto>>();
  const [workout, setWorkout] = useState<SaveWorkoutDTO>({
    name: "",
    day: -1,
    public: true,
    exercises: [],
  });
  const loadingId = "new-workout";
  const { handleLoading, loading } = useLoading(loadingId);

  const addExerciseToWorkout = useCallbackPlus(
    (exercise: WorkoutExercise) => {
      const parsed = AddExerciseSchema.parse(exercise);

      setWorkout((prev) => {
        return { ...prev, exercises: [...prev.exercises, parsed] };
      });
    },
    [setWorkout],
  );

  const fetchMuscles = useCallback(async () => {
    try {
      handleLoading(loadingId, true);
      const response = await api.exercise.getMuscleList();

      setMuscles(response);
    } catch (error) {
      handleLoading(loadingId, false);
    } finally {
      handleLoading(loadingId, false);
    }
  }, [setMuscles]);

  const changeWorkoutInfo = useCallback(({ key, value }: ChangeWorkoutInfo) => {
    setWorkout((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const fetchExercises = useCallback(
    async (id: string) => {
      try {
        handleLoading(loadingId, true);
        const response = await api.exercise.getExercises(id);

        setExercises(response);
      } catch (error) {
        handleLoading(loadingId, false);
      } finally {
        handleLoading(loadingId, false);
      }
    },
    [selectedMuscle],
  );

  const handleSelectMuscle = useCallback(
    (muscle: MuscleDto) => {
      setSelectedMuscle(muscle);

      if (muscle?.id) {
        fetchExercises(muscle.id);
      }
    },
    [setSelectedMuscle],
  );

  useEffect(() => {
    fetchMuscles();
  }, [fetchMuscles]);

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
      {selectedMuscle?.id ? (
        <ExercisePicker
          loading={loading}
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
        <MusclePicker openDrawer={openDrawer} loading={loading}>
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
