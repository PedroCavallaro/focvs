import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Workout } from "../api/dtos";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { STORAGE_KEYS } from "../utils/keys";
import { Storage } from "../services";

interface IWorkoutContext {
  workout: Workout;
  isLoading: boolean;
  startWorkout: () => void;
  finishWorkout: () => void;
  setWorkout: (workout: Workout | ((prev: Workout) => Workout)) => void;
}

const WorkoutContext = createContext({} as IWorkoutContext);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workout, setWorkout] = useState<Workout>({
    currentSets: {},
  } as Workout);

  const { isLoading } = useQuery({
    queryKey: ["workout-of-the-day"],
    queryFn: () => fetchWorkoutOfTheDay(),
  });

  const fetchWorkoutOfTheDay = useCallback(async () => {
    if (workout?.info?.started) {
      setWorkout(workout);

      return workout;
    }

    const hasOnStorage = await Storage.getItem<Workout>(
      STORAGE_KEYS.WORKOUT_OF_THE_DAY,
    );

    if (!hasOnStorage?.id) {
      const workout = await api.workout.getWorkoutOfTheDay();

      setWorkout(workout as Workout);

      return workout;
    }

    setWorkout(hasOnStorage);

    return hasOnStorage;
  }, [setWorkout, workout]);

  const startWorkout = useCallback(() => {
    setWorkout((prev) => {
      return {
        ...prev,
        info: {
          started: true,
          startedAt: new Date().getTime(),
        },
      };
    });
  }, [setWorkout]);

  const saveWorkoutOnStorage = useCallback(async () => {
    await Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, workout);
  }, [workout]);

  const finishWorkout = useCallback(() => {
    setWorkout((prev) => ({
      ...prev,
      info: {
        started: false,
        startedAt: new Date().getTime(),
        finishedAt: new Date().getTime(),
      },
    }));
  }, [setWorkout]);

  useEffect(() => {
    saveWorkoutOnStorage();
  }, [workout]);

  return (
    <WorkoutContext.Provider
      value={{
        workout,
        isLoading,
        startWorkout,
        finishWorkout,
        setWorkout,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);
