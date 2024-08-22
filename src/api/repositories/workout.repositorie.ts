import { SaveWorkoutDTO, Workout, WorkoutDetails } from "../dtos";
import { Repositorie } from "./repositorie";

export class WorkoutRepositorie extends Repositorie {
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

  async getUserWokouts() {
    const res = await this.api.get<WorkoutDetails[]>("/workout");

    return res;
  }
}
