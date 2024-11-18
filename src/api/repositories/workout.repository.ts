import { PaginationDTO, PaginationQuery } from "@/src/utils/pagination";
import {
  SaveWorkoutDTO,
  UpdateWorkoutDTO,
  Workout,
  WorkoutDetails,
} from "../dtos";
import { HttpClient } from "../http";

export class WorkoutRepository {
  protected readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
  }

  static build(api: HttpClient) {
    return { workout: new WorkoutRepository(api) };
  }

  async getWorkouts() {
    const res = await this.api.get<WorkoutDetails[]>("/workout");

    return res;
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

  async updateWorkout(data: UpdateWorkoutDTO | SaveWorkoutDTO) {
    const res = await this.api.patch("/workout", {
      body: data,
    });

    return res;
  }

  async getWorkoutOfTheDay() {
    const res = await this.api.get<WorkoutDetails>("/workout/today");

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
    const res = await this.api.get<WorkoutDetails & WorkoutDetails>(
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
