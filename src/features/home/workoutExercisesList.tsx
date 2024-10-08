import { Workout } from "@/src/api/dtos";
import { View } from "react-native";
import { ExerciseCard } from "../exerciseCard";

export function WorkoutExercisesList({
  exercises,
  started,
}: {
  started: number;
  exercises: Workout["exercises"];
}) {
  return (
    <View>
      <View className="flex-col gap-10">
        {exercises?.map((e, i) => {
          return (
            <ExerciseCard
              showCheckBox={true}
              exercise={e}
              key={i}
              editable={started}
            />
          );
        })}
      </View>
    </View>
  );
}
