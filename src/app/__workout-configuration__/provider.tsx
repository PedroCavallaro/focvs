import React, {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { api } from "@/src/api";
import {
  WorkoutDetails,
  SaveWorkoutDTO,
  WorkoutExercise,
  MuscleDto,
  AddExerciseSchema,
} from "@/src/api/dtos";
import { ChangeWorkoutInfo } from "./workoutConfigurationTemplate";

const baseWorkout = {
  name: "",
  day: -1,
  public: true,
  exercises: [],
  deletedSets: [],
};

const WorkoutContext = createContext<ReturnType<
  typeof useWorkouProvider
> | null>(null);

function useWorkouProvider(workoutToUpdate?: WorkoutDetails) {
  const [workout, setWorkout] = useState<SaveWorkoutDTO>(
    workoutToUpdate?.id ? { ...workoutToUpdate, deletedSets: [] } : baseWorkout,
  );

  const [duplicatedExercise, setDuplicatedExercise] =
    useState<WorkoutExercise | null>(null);
  const [query, setQuery] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleDto>(
    {} as MuscleDto,
  );

  const {
    isLoading: muscleLoading,
    data: muscles,
    refetch: fetchMuscles,
  } = useQuery({
    queryKey: ["muscles"],
    queryFn: () => api.exercise.getMuscleList(query),
  });

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
    setWorkout(baseWorkout);
  }, []);

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

      const updatedExercises = workout.exercises.map((e) => {
        if (e.id === exerciseId) {
          const set = e.sets[setIndex];
          set[type] = Number(value);
          e.sets[setIndex] = set;
        }

        return e;
      });

      setWorkout((prev) => ({ ...prev, exercises: updatedExercises }));
    },
    [workout],
  );

  const refetchMuscles = useMemo(
    () => debounce(() => fetchMuscles(), 400),
    [fetchMuscles],
  );
  const refetchExercises = useMemo(
    () => debounce(() => fetchExercises(), 400),
    [fetchExercises],
  );

  const addExerciseToWorkout = useCallback(
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

      const newExercises = workout.exercises.map((e) =>
        e.id === exercise.id ? parsed : e,
      );

      setWorkout((prev) => ({
        ...prev,
        exercises: newExercises,
        deletedSets: [
          ...(prev.deletedSets ?? []),
          ...(parsed.deletedSets ?? []),
        ],
      }));
    },
    [workout],
  );

  const changeWorkoutInfo = useCallback(({ key, value }: ChangeWorkoutInfo) => {
    setWorkout((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const handleSelectMuscle = useCallback((muscle: MuscleDto) => {
    setSelectedMuscle(muscle);
  }, []);

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

export function WorkoutConfigurationProvider({
  workoutToUpdate,
  children,
}: {
  workoutToUpdate?: WorkoutDetails;
  children: ReactNode;
}) {
  const value = useWorkouProvider(workoutToUpdate);

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
}

export const useWorkoutConfiguration = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  }

  return context;
};
