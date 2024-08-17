export interface MuscleDto {
  id: string;
  name: string;
  picture_url: string;
}

export interface ExerciseDto {
  id: string;
  name: string;
  description?: string;
  gif_url: string;
}
