import { Workout } from "../dtos";
import { HttpClient } from "../http";
import { Repository } from "./repository";

export class StatisticsRepository extends Repository {
  constructor(api: HttpClient) {
    super(api);

    this.api.setBaseUrl(process.env.EXPO_PUBLIC_STATISTICS_API_URL);
  }

  static build(api: HttpClient) {
    return { statistics: new StatisticsRepository(api) };
  }

  async getAllPerformedWorkouts() {
    try {
      const res = await this.api.get("/statistics/workouts");

      console.log(res);

      return res;
    } catch (error) {
      console.log(error);

      return [];
    }
  }

  async savePerformedWorkout(workout: Workout) {
    console.log(workout.exercises);
    const res = await this.api.post("/performed/workouts", {
      body: workout,
    });

    return res;
  }
}
