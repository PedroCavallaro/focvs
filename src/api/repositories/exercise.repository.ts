import { PaginationDTO } from "@/src/utils/pagination";
import { ExerciseDto, MuscleDto } from "../dtos";
import { HttpClient } from "../http";

export class ExerciseRepositorie {
  protected readonly api: HttpClient;

  constructor(api: HttpClient) {
    this.api = api;
  }

  static build(api: HttpClient) {
    return { exercise: new ExerciseRepositorie(api) };
  }

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
