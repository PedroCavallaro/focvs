import { HttpFactory } from "./http/http.factory";
import { AuthRepository } from "./repositories";
import { ExerciseRepositorie } from "./repositories/exercise.repository";
import { WorkoutRepositorie } from "./repositories/workout.repositorie";

const factory = new HttpFactory(process.env.EXPO_PUBLIC_API_URL, [
  AuthRepository,
  WorkoutRepositorie,
  ExerciseRepositorie,
]);

export const api = factory.createAxiosClient();
