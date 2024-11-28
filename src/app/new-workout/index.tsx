import { WorkoutConfigurationProvider } from "../__workout-configuration__/provider";
import { WorkoutConfigurationTemplate } from "../__workout-configuration__/workoutConfigurationTemplate";

export default function NewWorkout() {
  return (
    <WorkoutConfigurationProvider>
      <WorkoutConfigurationTemplate updating={false} />
    </WorkoutConfigurationProvider>
  );
}
