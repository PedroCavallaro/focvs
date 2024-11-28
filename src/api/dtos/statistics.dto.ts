import { ExerciseDto } from "./exercise.dto";

export interface WorkoutHoursResponse {
  value: number;
  label: string;
}

interface Pr {
  reps: number;
  weight: number;
}

export interface ExerciseImprovement {
  oldPr: Pr;
  pr: Pr;
  exercise: Pick<ExerciseDto, "id" | "name" | "gif_url">;
}

export interface Evolution {
  label: string;
  volume: string;
}

export interface StatisticsResponse {
  hours: WorkoutHoursResponse[];
  dates: string[];
  exerciseImprovements: ExerciseImprovement[];
  evolution: Evolution[];
}
