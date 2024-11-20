import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Workout } from "../api/dtos";
import { useMutation, useQuery } from "@tanstack/react-query";
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
}

const WorkoutContext = createContext({} as IWorkoutContext);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workout, setWorkout] = useState<Workout>({
    currentSets: {},
  } as Workout);

  const { isLoading, refetch } = useQuery({
    queryKey: ["workout-of-the-day"],
    enabled: false,
    queryFn: () => fetchWorkoutOfTheDay(),
  });

  const { mutate: savePerformedWorkout } = useMutation({
    mutationFn: (workout: Workout) =>
      api.statistics.savePerformedWorkout(workout),
    mutationKey: ["save-performed-workout"],
    onError: (err) => console.log(err),
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

      await Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, workout);

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
    console.log(await Storage.getItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY));

    await Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, workout);
  }, [workout]);

  const finishWorkout = useCallback(() => {
    const info = {
      ...workout.info,
      started: false,
      finishedAt: new Date().getTime(),
    };

    setWorkout((prev) => ({
      ...prev,
      info,
    }));

    savePerformedWorkout({ ...workout, info });
  }, [setWorkout]);

  useEffect(() => {
    saveWorkoutOnStorage();
  }, [workout]);

  return (
    <WorkoutContext.Provider
      value={{
        workout,
        isLoading,
        fetchWorkout: refetch,
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
