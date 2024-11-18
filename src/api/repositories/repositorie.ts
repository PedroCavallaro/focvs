import { HttpClient } from "../http";
import { AuthRepository } from "./auth.repository";
import { ExerciseRepositorie } from "./exercise.repository";
import { StatisticsRepository } from "./statistics.repository";
import { WorkoutRepository } from "./workout.repository";

export interface Api {
  auth: AuthRepository;
  workout: WorkoutRepository;
  exercise: ExerciseRepositorie;
  statistics: StatisticsRepository
}

export interface Repositorie {
  build(api: HttpClient): Partial<Api>;
}
