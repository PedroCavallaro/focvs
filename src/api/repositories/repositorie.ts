import { HttpClient } from "../http";
import { AuthRepository } from "./auth.repositorie";
import { ExerciseRepositorie } from "./exercise.repository";
import { WorkoutRepositorie } from "./workout.repositorie";

export interface Api {
  auth: AuthRepository;
  workout: WorkoutRepositorie;
  exercise: ExerciseRepositorie;
}

export interface Repositorie {
  build(api: HttpClient): Partial<Api>;
}
