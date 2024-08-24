import { SaveWorkoutDTO, Workout, WorkoutDetails } from "../dtos";
import { HttpClient } from "../http";

export class WorkoutRepositorie {
  protected readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
  }

  static build(api: HttpClient) {
    return { workout: new WorkoutRepositorie(api) };
  }

  async getWorkouts() {
    try {
      const res = await this.api.get<WorkoutDetails[]>("/workout");

      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async createWorkout(data: SaveWorkoutDTO) {
    const res = await this.api.post("/workout", {
      body: data,
    });

    return res;
  }

  async getWorkoutOfTheDay() {
    const res = await this.api.get<Workout>("/workout/today");

    return res;
  }

  async getWorkout(id: string) {
    const res = await this.api.get<Workout>(`/workout/user/${id}`);

    return res;
  }

  async getFullWorkoutById(id: string) {
    const res = await this.api.get<Workout & WorkoutDetails>(`/workout/${id}`);

    return res;
  }

  async getUserWokouts() {
    const res = await this.api.get<WorkoutDetails[]>("/workout");

    return res;
  }

  async deleteWorkout(id: string) {
    const res = await this.api.delete<WorkoutDetails[]>(`/workout/${id}`);

    return res;
  }
}
