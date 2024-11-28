import { PaginationDTO } from "@/src/utils/pagination";
import { ExerciseDto, MuscleDto } from "../dtos";
import { HttpClient } from "../http";
import { Repository } from "./repository";

export class ExerciseRepositorie extends Repository {
  constructor(api: HttpClient) {
    super(api);
  }

  static build(api: HttpClient) {
    return { exercise: new ExerciseRepositorie(api) };
  }

  async getMuscleList(query: string) {
    const response = await this.api.get<MuscleDto[]>("/exercise/muscle", {
      query: { q: query },
    });

    return response;
  }

  async getExercises(muscleId: string, query: string) {
    const response = await this.api.get<PaginationDTO<ExerciseDto>>(
      `/exercise/${muscleId}`,
      {
        query: {
          q: query,
        },
      },
    );

    return response;
  }
}
