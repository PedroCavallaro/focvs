import { HttpClient } from "../http";
import { AuthRepository } from "./auth.repositorie";
import { ExerciseRepositorie } from "./exercise.repository";
import { WorkoutRepositorie } from "./workout.repositorie";
export * from "./auth.repositorie";

export function buildRepos(api: HttpClient) {
  return {
    auth: new AuthRepository(api),
    workout: new WorkoutRepositorie(api),
    exercise: new ExerciseRepositorie(api)
  };
}
