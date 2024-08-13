import { api } from "@/src/api";
import { ExerciseDto, MuscleDto } from "@/src/api/dtos";
import { ExercisePicker } from "@/src/components/new-workout/exercisePicker";
import { MuscleCard } from "@/src/components/new-workout/muscleCard";
import { MusclePicker } from "@/src/components/new-workout/musclePicker";
import { NewWorkoutForm } from "@/src/components/new-workout/newWorkoutForm";
import { PaginationDTO } from "@/src/utils/pagination";
import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";

export default function NewWorkout() {
  const [muscles, setMuscles] = useState<MuscleDto[]>([]);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleDto>({} as MuscleDto)
  const [exercises, setExercises] = useState<PaginationDTO<ExerciseDto>>()


  const fetchMuscles = useCallback(async () => {
    const response = await api.exercise.getMuscleList()

    setMuscles(response)
  }, [setMuscles])

  const fetchExercises = useCallback(async (id: string) => {
    const response = await api.exercise.getExercises(id)

    setExercises(response)
  }, [selectedMuscle])


  const handleSelectMuscle = useCallback((muscle: MuscleDto) => {
    setSelectedMuscle(muscle)
    fetchExercises(muscle.id)
  }, [setSelectedMuscle])

  useEffect(() => {
    fetchMuscles()
  }, [fetchMuscles])


  return (
    <View className="flex-col gap-14">
      <View className="flex-col gap-8">
        <Text className="text-lg font-light text-white">Novo treino</Text>
        <NewWorkoutForm />
      </View>
      {
        selectedMuscle?.id ? (<ExercisePicker muscleName={selectedMuscle.name}>
          <View>

          </View>
        </ExercisePicker>) : (
                <MusclePicker>
      <ScrollView horizontal className="flex-row flex-wrap gap-8">
        <FlatList
          data={muscles}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <MuscleCard muscle={item} handleSelectMuscle={handleSelectMuscle}/>}
        />
      </ScrollView>
      </MusclePicker>
      

        )
      }

    </View>
  );
}
