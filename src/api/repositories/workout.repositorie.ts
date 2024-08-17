import { MuscleDto, SaveWorkoutDTO } from "../dtos";
import { Repositorie } from "./repositorie";

export class WorkoutRepositorie extends Repositorie {
  async getWorkouts() {
    const res = await this.api.get("/workout");

    return res;
  }

  async createWorkout(data: SaveWorkoutDTO) {
    const res = await this.api.post("/workout", {
      body: data
    })


    return res
  }
}
