import { HttpClient } from "../http";

export class StatisticsRepository {
  private readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;

    this.api.setBaseUrl(process.env.EXPO_PUBLIC_STATISTICS_API_URL);
  }

  static build(api: HttpClient) {
    return { statistics: new StatisticsRepository(api) };
  }

  async getAllPerformedWorkouts() {
    try {
      const res = await this.api.get("/statistics/workouts");

      return res;
    } catch (error) {
      console.log(error);

      return [];
    }
  }
}
