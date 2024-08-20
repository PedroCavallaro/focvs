import { api } from "@/src/api";
import { WorkoutDetails } from "@/src/api/dtos";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

export function SwitchWorkoutModal() {

  const [workouts, setWorkouts] = useState<WorkoutDetails[]>([] )


  const fetchWorkouts = useCallback(async () => {
    const workouts = await api.workout.getUserWokouts()

    setWorkouts(workouts)

  }, [])


  useEffect(() => {
    fetchWorkouts()
  },[fetchWorkouts])



  return <View className="h-[45rem] w-full flex-col">


  
  </View>;
}
