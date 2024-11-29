import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { Workout } from "../api/dtos";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { STORAGE_KEYS } from "../utils/keys";
import { Storage } from "../services";

interface IWorkoutContext {
  workout: Workout;
  isLoading: boolean;
  startWorkout: () => void;
  finishWorkout: () => void;
  setWorkout: (workout: Workout | ((prev: Workout) => Workout)) => void;
  fetchWorkout: () => void;
  checkSet: (exerciseId: string, setId: string) => void;
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
}

const WorkoutContext = createContext({} as IWorkoutContext);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workout, setWorkout] = useState<Workout>({
    currentSets: {},
  } as Workout);

  const [loading, setLoading] = useState(false);

  const { mutate: savePerformedWorkout } = useMutation({
    mutationFn: (workout: Workout) =>
      api.statistics.savePerformedWorkout(workout),
    mutationKey: ["save-performed-workout"],
    onError: (err) => console.log(err),
  });

  const fetchWorkoutOfTheDay = useCallback(async () => {
    try {
      if (workout?.info?.started) {
        console.log("ja iniciado");
        setWorkout(workout);

        return workout;
      }

      setLoading(true);
      const hasOnStorage = await Storage.getItem<Workout>(
        STORAGE_KEYS.WORKOUT_OF_THE_DAY,
      );

      if (!hasOnStorage?.id) {
        console.log("não tem no storage");
        const workout = await api.workout.getWorkoutOfTheDay();

        setWorkout({ ...workout, currentSets: {} });

        await Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, workout);

        return workout;
      }

      console.log("tem no storage");
      setWorkout(hasOnStorage);

      return hasOnStorage;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setWorkout, workout]);

  const startWorkout = useCallback(async () => {
    setWorkout((prev) => {
      return {
        ...prev,
        info: {
          started: true,
          startedAt: new Date().getTime(),
        },
      };
    });

    await Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, {
      ...workout,
      info: {
        started: true,
        startedAt: new Date().getTime(),
      },
    });
  }, [workout, setWorkout]);

  const finishWorkout = useCallback(async () => {
    const workoutInfo = await Storage.getItem<Workout>(
      STORAGE_KEYS.WORKOUT_OF_THE_DAY,
    );

    if (!workoutInfo) return;

    const info = {
      ...workoutInfo.info,
      started: false,
      finishedAt: new Date().getTime(),
    };

    savePerformedWorkout({ ...workoutInfo, info });

    setWorkout((prev) => {
      Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, {
        ...prev,
        info: {
          ...info,
          startedAt: undefined,
        },
      });

      return {
        ...prev,
        info: {
          ...info,
          startedAt: undefined,
        },
      };
    });
  }, [setWorkout]);

  const checkSet = useCallback(
    (exerciseId: string, setId: string) => {
      setWorkout((prev) => {
        const exercises = prev.exercises.map((exercise) => {
          if (exercise.id !== exerciseId) return exercise;

          const sets = exercise.sets.map((e) => {
            if (e.id === setId) {
              return { ...e, done: true };
            }

            return e;
          });

          exercise.sets = sets;

          return exercise;
        });

        const currentSet = prev.currentSets?.[exerciseId] ?? 0;

        Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, {
          ...prev,
          currentSets: {
            ...prev.currentSets,
            [exerciseId]: currentSet + 1,
          },
          exercises,
        });

        return {
          ...prev,
          currentSets: {
            ...prev.currentSets,
            [exerciseId]: currentSet + 1,
          },
          exercises,
        };
      });
    },
    [workout, setWorkout],
  );

  const onChange = useCallback(
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
        if (e.id == exerciseId) {
          const set = e.sets[setIndex];

          set[type] = Number(value);

          e.sets[setIndex] = set;
        }

        return e;
      });

      setWorkout((prev) => {
        Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, {
          ...prev,
          exercises,
        });

        return { ...prev, exercises: parsedExercises };
      });
    },
    [setWorkout, workout],
  );

  return (
    <WorkoutContext.Provider
      value={{
        workout,
        isLoading: loading,
        fetchWorkout: fetchWorkoutOfTheDay,
        startWorkout,
        finishWorkout,
        setWorkout,
        onChange,
        checkSet,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);
