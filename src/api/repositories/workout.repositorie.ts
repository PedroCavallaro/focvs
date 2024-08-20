import { MuscleDto, SaveWorkoutDTO, Workout } from "../dtos";
import { Repositorie } from "./repositorie";

export class WorkoutRepositorie extends Repositorie {
  async getWorkouts() {
    const res = await this.api.get("/workout");

    return res;
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
}
