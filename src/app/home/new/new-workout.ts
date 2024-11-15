import { api } from "@/src/api";
import {
  MuscleDto,
  SaveWorkoutDTO,
  AddExerciseSchema,
  WorkoutExercise,
} from "@/src/api/dtos";
import { useCallbackPlus } from "@/src/hooks";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useState, useMemo, useCallback } from "react";
import { ChangeWorkoutInfo } from ".";
import { atomWithReset } from "jotai/utils";
import { useAtom } from "jotai";

const base = {
  name: "",
  day: -1,
  public: true,
  exercises: [],
};
const newWorkoutAtom = atomWithReset<SaveWorkoutDTO>(base);

export function useNewWorkout() {
  const [workout, setWorkout] = useAtom(newWorkoutAtom);
  const [duplicatedExercise, setDuplicatedExercise] =
    useState<WorkoutExercise | null>(null);
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

  const clearWorkout = useCallback(() => {
    setWorkout(base);
  }, [setWorkout]);

  const changeOnWorkoutSampling = useCallback(
    ({
      type,
      setIndex,
      value,
      exerciseId,
    }: {
      type: "reps" | "weight";
      value: string;
      setIndex: number;
      exerciseId: string;
    }) => {
      if (!workout?.exercises) return;

      const exercises = workout.exercises;

      const parsedExercises = exercises?.map((e) => {
        if (e.exerciseId == exerciseId) {
          const set = e.sets[setIndex];

          set[type] = Number(value);

          e.sets[setIndex] = set;
        }

        return e;
      });

      setWorkout((prev) => ({ ...prev, exercises: parsedExercises }));
    },
    [workout],
  );

  const refetchMuscles = useMemo(
    () => debounce(() => fetchMuscles(), 400),
    [fetchMuscles],
  );

  const refetchExercises = useMemo(
    () => debounce(() => fetchExercises(), 400),
    [fetchMuscles],
  );

  const addExerciseToWorkout = useCallbackPlus(
    ({
      exercise,
      shouldOverride,
    }: {
      exercise: WorkoutExercise;
      shouldOverride?: boolean;
    }) => {
      const parsed = AddExerciseSchema.parse(exercise);

      const isAdded = workout.exercises.find(
        (e) => e.exerciseId === exercise.exerciseId,
      );

      if (isAdded && !shouldOverride) {
        return setDuplicatedExercise(exercise);
      }

      if (!shouldOverride) {
        return setWorkout((prev) => ({
          ...prev,
          exercises: [...prev.exercises, parsed],
        }));
      }

      const newExercises = workout.exercises.map((e) => {
        if (e.exerciseId === exercise.exerciseId) {
          return parsed;
        }

        return e;
      });

      return setWorkout((prev) => ({
        ...prev,
        exercises: [...newExercises],
      }));
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
    duplicatedExercise,
    changeOnWorkoutSampling,
    fetchExercises,
    clearWorkout,
    setQuery,
    addExerciseToWorkout,
    changeWorkoutInfo,
    handleSelectMuscle,
  };
}

export default { useNewWorkout };
