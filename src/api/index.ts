import { HttpFactory } from "./http/http.factory";
import { AuthRepository } from "./repositories";
import { ExerciseRepositorie } from "./repositories/exercise.repository";
import { StatisticsRepository } from "./repositories/statistics.repository";
import { WorkoutRepository } from "./repositories/workout.repository";

const factory = new HttpFactory(process.env.EXPO_PUBLIC_API_URL, [
  AuthRepository,
  WorkoutRepository,
  ExerciseRepositorie,
  StatisticsRepository,
]);

export const api = factory.createAxiosClient();
