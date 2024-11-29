import { Workout } from "@/src/api/dtos";
import { createContext, ReactNode, useContext } from "react";

interface IExerciseCardContext {
  handleActions: () => void;
  visible: boolean;
  exercise: Workout["exercises"][0];
}

const ExerciseCardContext = createContext({} as IExerciseCardContext);

export function ExerciseCardProvider({
  handleActions,
  visible,
  children,
  exercise,
}: IExerciseCardContext & { children: ReactNode }) {
  return (
    <ExerciseCardContext.Provider value={{ handleActions, visible, exercise }}>
      {children}
    </ExerciseCardContext.Provider>
  );
}

export const useExerciseCard = () => useContext(ExerciseCardContext);
