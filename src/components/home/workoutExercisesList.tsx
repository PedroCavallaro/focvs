import { Workout } from "@/src/api/dtos";
import { View } from "react-native";
import { ExerciseCard } from "../exerciseCard";
import { NoWorkout } from "./noWokout";

export function WorkoutExercisesList({
  id,
  exercises,
}: {
  id?: string;
  exercises: Workout["exercises"];
}) {
  return (
        <View>
      <View className="flex-col gap-10">
        {exercises?.map((e, i) => {
          return <ExerciseCard exercise={e} key={i} editable />;
        })}
      </View>
    </View>    
  );
}
