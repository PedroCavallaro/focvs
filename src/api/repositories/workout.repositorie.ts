import { PaginationDTO, PaginationQuery } from "@/src/utils/pagination";
import {
  SaveWorkoutDTO,
  UpdateWorkoutDTO,
  Workout,
  WorkoutDetails,
  WorkoutResponse,
} from "../dtos";
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

  async searchWorkouts(q: PaginationQuery = {}) {
    const res = await this.api.get<PaginationDTO<WorkoutDetails>>(
      "/workout/search",
      {
        query: { ...q },
      },
    );

    return res;
  }

  async createWorkout(data: SaveWorkoutDTO) {
    const res = await this.api.post("/workout", {
      body: data,
    });

    return res;
  }

  async updateWorkout(data: UpdateWorkoutDTO) {
    const res = await this.api.patch("/workout", {
      body: data,
    });

    return res;
  }

  async getWorkoutOfTheDay() {
    const res = await this.api.get<WorkoutResponse>("/workout/today");

    return res;
  }

  async getWorkout(id: string) {
    const res = await this.api.get<Workout>(`/workout/${id}`);

    return res;
  }

  async getWorkoutByLink(link: string) {
    const res = await this.api.get<
      WorkoutDetails & { isFromSameUser: boolean }
    >(`${link}`);

    return res;
  }

  async copyWorkoutToAccount(link: string, signature: string) {
    console.log(link);
    const res = await this.api.post<WorkoutDetails>(`${link}`, {
      body: { signature },
    });

    return res;
  }

  async getFullWorkoutById(id: string) {
    const res = await this.api.get<WorkoutResponse & WorkoutDetails>(
      `/workout/${id}`,
    );

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
