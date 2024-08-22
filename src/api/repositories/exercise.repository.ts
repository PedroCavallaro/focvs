import { PaginationDTO } from "@/src/utils/pagination";
import { ExerciseDto, MuscleDto } from "../dtos";
import { Repositorie } from "./repositorie";

export class ExerciseRepositorie extends Repositorie {
  async getMuscleList() {
    const response = await this.api.get<MuscleDto[]>("/exercise/muscle");

    return response;
  }

  async getExercises(muscleId: string) {
    const response = await this.api.get<PaginationDTO<ExerciseDto>>(
      `/exercise/${muscleId}`,
    );

    return response;
  }
}
