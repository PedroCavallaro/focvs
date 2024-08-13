import { MuscleDto } from "../dtos";
import { Repositorie } from "./repositorie";

export class WorkoutRepositorie extends Repositorie {
  async getWorkouts() {
    const res = await this.api.get("/workout");

    return res;
  }
}
