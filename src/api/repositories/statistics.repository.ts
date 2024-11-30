import { PerformedWorkout, Workout } from "../dtos";
import { HttpClient } from "../http";
import { Repository } from "./repository";
import {
  Evolution,
  ExerciseImprovement,
  StatisticsResponse,
  WorkoutHoursResponse,
} from "../dtos/statistics.dto";

export class StatisticsRepository extends Repository {
  constructor(api: HttpClient) {
    super(api);

    this.api.setBaseUrl(process.env.EXPO_PUBLIC_STATISTICS_API_URL);
  }

  static build(api: HttpClient) {
    return { statistics: new StatisticsRepository(api) };
  }

  async getPerformedWorkout(date: string): Promise<PerformedWorkout> {
    const res = await this.api.get<PerformedWorkout>(
      `/statistics/performed-workout/${date}`,
    );

    return res;
  }

  async getAllStatics(): Promise<StatisticsResponse> {
    const statistics = await Promise.all([
      this.getAllPerformedWorkouts(),
      this.getWorkoutAmount(),
      this.getImprovements(),
      this.getEvolution(),
    ]);

    return {
      dates: statistics[0],
      hours: statistics[1],
      exerciseImprovements: statistics[2],
      evolution: statistics[3],
    };
  }

  async getImprovements(): Promise<ExerciseImprovement[]> {
    try {
      const res = await this.api.get<ExerciseImprovement[]>(
        "/statistics/last-improvements",
      );

      return res;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  async getEvolution(): Promise<Evolution[]> {
    const res = await this.api.get<Evolution[]>("/statistics/evolution");

    return res;
  }

  async getAllPerformedWorkouts(): Promise<string[]> {
    const res = await this.api.get<string[]>("/statistics/workouts");

    return res;
  }

  async getWorkoutAmount(): Promise<WorkoutHoursResponse[]> {
    const res = await this.api.get<WorkoutHoursResponse[]>(
      "/statistics/workouts-between-days",
      {
        query: { days: 30 * 6 },
      },
    );

    return res;
  }

  async savePerformedWorkout(workout: Workout) {
    const res = await this.api.post("/performed/workouts", {
      body: workout,
    });

    return res;
  }
}
