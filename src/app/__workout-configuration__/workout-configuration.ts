import { api } from "@/src/api";
import {
  MuscleDto,
  SaveWorkoutDTO,
  AddExerciseSchema,
  WorkoutExercise,
  WorkoutDetails,
} from "@/src/api/dtos";
import { useCallbackPlus } from "@/src/hooks";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useState, useMemo, useCallback } from "react";
import { atomWithReset } from "jotai/utils";
import { useAtom } from "jotai";
import { ChangeWorkoutInfo } from "./workoutConfigurationTemplate";

const base = {
  name: "",
  day: -1,
  public: true,
  exercises: [],
  deletedSets: [],
};

function getAtom(workoutToUpdate?: WorkoutDetails) {
  if (workoutToUpdate?.id) {
    return atomWithReset<SaveWorkoutDTO>({
      ...workoutToUpdate,
      deletedSets: [],
    });
  }

  return atomWithReset<SaveWorkoutDTO>(base);
}

export function useWorkoutConfiguration(workoutToUpdate?: WorkoutDetails) {
  const atom = useMemo(() => getAtom(workoutToUpdate), [workoutToUpdate]);

  const [workout, setWorkout] = useAtom(atom);
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
      if (!workout?.exercises) {
        return;
      }

      const exercises = workout.exercises;

      const parsedExercises = exercises?.map((e) => {
        if (e.id == exerciseId) {
          const set = e.sets[setIndex];

          set[type] = Number(value);

          e.sets[setIndex] = set;
        }

        return e;
      });

      setWorkout((prev) => ({ ...prev, exercises: parsedExercises }));
    },
    [workout, setWorkout],
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

      const isAdded = workout.exercises.find((e) => e.id === exercise.id);

      if (isAdded && !shouldOverride) {
        return setDuplicatedExercise(exercise);
      }

      if (!shouldOverride) {
        return setWorkout((prev) => ({
          ...prev,
          exercises: [...prev.exercises, parsed],
          deletedSets: [
            ...(prev.deletedSets ?? []),
            ...(parsed.deletedSets ?? []),
          ],
        }));
      }

      const newExercises = workout.exercises.map((e) => {
        if (e.id === exercise.id) {
          return parsed;
        }

        return e;
      });

      return setWorkout((prev) => ({
        ...prev,
        exercises: [...newExercises],
        deletedSets: [
          ...(prev.deletedSets ?? []),
          ...(parsed.deletedSets ?? []),
        ],
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
    setWorkout,
    setQuery,
    addExerciseToWorkout,
    changeWorkoutInfo,
    handleSelectMuscle,
  };
}

export default { useWorkoutConfiguration };
