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

  const [loading, setLoading] = useState(false);

  const { mutate: savePerformedWorkout } = useMutation({
    mutationFn: (workout: Workout) =>
      api.statistics.savePerformedWorkout(workout),
    mutationKey: ["save-performed-workout"],
    onError: (err) => console.log(err),
  });

  const fetchWorkoutOfTheDay = useCallback(async () => {
    try {
      setLoading(true);
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

        await Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, workout);

        return workout;
      }

      setWorkout(hasOnStorage);

      return hasOnStorage;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
    console.log("a");
    await Storage.setItem(STORAGE_KEYS.WORKOUT_OF_THE_DAY, workout);
  }, [workout]);

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

    setWorkout(() => ({
      ...workoutInfo,
      info,
    }));

    savePerformedWorkout({ ...workoutInfo, info });
  }, [setWorkout]);

  useEffect(() => {
    saveWorkoutOnStorage();
  }, [workout]);

  return (
    <WorkoutContext.Provider
      value={{
        workout,
        isLoading: loading,
        fetchWorkout: fetchWorkoutOfTheDay,
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
