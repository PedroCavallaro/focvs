import { api } from "@/src/api";
import {
  MuscleDto,
  SaveWorkoutDTO,
  WorkoutExercise,
  AddExerciseSchema,
} from "@/src/api/dtos";
import { useCallbackPlus } from "@/src/hooks";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useState, useMemo, useCallback } from "react";
import { ChangeWorkoutInfo } from ".";
import { Alert } from "react-native";

export function useNewWorkout() {
  const [query, setQuery] = useState("");
  const {
    isLoading: muscleLoading,
    data: muscles,
    refetch: fetchMuscles,
  } = useQuery({
    queryKey: ["muscles"],
    queryFn: () => api.exercise.getMuscleList(query),
  });
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleDto>(
    {} as MuscleDto,
  );

  const {
    data: exercises,
    isLoading: exerciseLoading,
    refetch: fetchExercises,
  } = useQuery({
    queryKey: ["exercises", selectedMuscle.id],
    queryFn: () => api.exercise.getExercises(selectedMuscle.id, query),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const [workout, setWorkout] = useState<SaveWorkoutDTO>({
    name: "",
    day: -1,
    public: true,
    exercises: [],
  });

  const refetchMuscles = useMemo(
    () => debounce(() => fetchMuscles(), 400),
    [fetchMuscles],
  );

  const refetchExercises = useMemo(
    () => debounce(() => fetchExercises(), 400),
    [fetchMuscles],
  );

  const addExerciseToWorkout = useCallbackPlus(
    (exercise: WorkoutExercise) => {
      const parsed = AddExerciseSchema.parse(exercise);

      const isAdded = workout.exercises.find(
        (e) => e.exerciseId === exercise.exerciseId,
      );

      if (isAdded) {
        return Alert.alert(
          "Exercício já adicionado",
          "Deseja sobreescrever?",
          [
            {
              onPress: () =>
                setWorkout((prev) => {
                  return { ...prev, exercises: [...prev.exercises, parsed] };
                }),
              text: "Sim",
            },
            {
              text: "Não",
              style: "cancel",
            },
          ],
          {
            userInterfaceStyle: "light",
          },
        );
      }

      return setWorkout((prev) => {
        return { ...prev, exercises: [...prev.exercises, parsed] };
      });
    },
    [setWorkout, workout],
  );

  const changeWorkoutInfo = useCallback(({ key, value }: ChangeWorkoutInfo) => {
    setWorkout((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleSelectMuscle = useCallback(
    async (muscle: MuscleDto) => {
      setSelectedMuscle(muscle);
    },
    [setSelectedMuscle],
  );

  return {
    query,
    muscleLoading,
    muscles,
    exercises,
    exerciseLoading,
    workout,
    refetchMuscles,
    refetchExercises,
    selectedMuscle,
    fetchExercises,
    setQuery,
    addExerciseToWorkout,
    changeWorkoutInfo,
    handleSelectMuscle,
  };
}
