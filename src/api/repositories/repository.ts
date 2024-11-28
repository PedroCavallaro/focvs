import { HttpClient } from "../http";
import { AuthRepository } from "./auth.repository";
import { ExerciseRepositorie } from "./exercise.repository";
import { StatisticsRepository } from "./statistics.repository";
import { WorkoutRepository } from "./workout.repository";

export interface Api {
  auth: AuthRepository;
  workout: WorkoutRepository;
  exercise: ExerciseRepositorie;
  statistics: StatisticsRepository;
}

export abstract class Repository {
  protected readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static build(api: HttpClient): Partial<Api> {
    throw new Error("METHOD NOT IMPLEMENTED");
  }

  handleErrors() {}
}
