import { z } from "zod";

export const ExerciseSetSchema = z.object({
  set_number: z.number(),
  reps: z.number(),
  weight: z.number(),
});

export const AddExerciseSchema = z.object({
  exerciseId: z.string(),
  name: z.string().optional(),
  gif_url: z.string().optional(),
  sets: z.array(ExerciseSetSchema, {
    invalid_type_error: "Exercícios devem ser um array",
  }),
});

export const ParseWorkoutInfo = z.object({
  name: z.string(),
  day: z.number().min(0).max(6),
});

export const SaveWorkout = z.object({
  name: z.string(),
  day: z.number().min(0).max(6),
  public: z.boolean(),
  exercises: z.array(AddExerciseSchema, {
    invalid_type_error: "Exercícios devem ser um array",
  }),
});

export const UpdateWorkout = z.object({
  id: z.string(),
  name: z.string().optional(),
  day: z.number().min(0).max(6).optional(),
  public: z.boolean().optional(),
  picture_url: z.string().optional(),
  exercises: z
    .array(AddExerciseSchema, {
      invalid_type_error: "Exercícios devem ser um array",
    })
    .optional(),
});

export type ExerciseSet = z.infer<typeof ExerciseSetSchema>;
export type SaveWorkoutDTO = z.infer<typeof SaveWorkout>;
export type WorkoutResponse = z.infer<typeof SaveWorkout>;
export type UpdateWorkoutDTO = z.infer<typeof UpdateWorkout>;

export type WorkoutDetails = SaveWorkoutDTO & {
  id: string;
  picture_url: string;
  userId: string;
  user: {
    name: string;
    image_url: string;
  };
  signature: string;
  exerciseAmount: number;
};
export type WorkoutExercise = z.infer<typeof AddExerciseSchema>;
export type Workout = WorkoutResponse & {
  id: string;
  signature: string;
  currentSets?: CurrentSets;
  info?: {
    started: boolean;
    startedAt: number;
    finishedAt?: number;
  };
};

type CurrentSets = {
  [key: string]: number;
};
