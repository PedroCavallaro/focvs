import { z } from "zod";

export const ExerciseSetSchema = z.object({
  id: z.string().optional(),
  set_number: z.number(),
  reps: z.number(),
  done: z.boolean().optional(),
  weight: z.number(),
});

export const AddExerciseSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  gif_url: z.string().optional(),
  sets: z.array(ExerciseSetSchema, {
    invalid_type_error: "Exercícios devem ser um array",
  }),
  // remove this later
  deletedSets: z.array(z.string()).optional(),
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
  deletedSets: z.array(z.string()).optional(),
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
  deletedSets: z.array(z.string()).optional(),
});

export type ExerciseSet = z.infer<typeof ExerciseSetSchema>;
export type SaveWorkoutDTO = z.infer<typeof SaveWorkout>;
export type UpdateWorkoutDTO = z.infer<typeof UpdateWorkout>;
type WorkoutResponse = z.infer<typeof SaveWorkout>;

export type Workout = WorkoutResponse & {
  id: string;
  signature: string;
  currentSets?: CurrentSets;
  info?: {
    started: boolean;
    startedAt?: number;
    finishedAt?: number;
  };
};

export type WorkoutDetails = WorkoutResponse & {
  id: string;
  picture_url: string;
  user: {
    id: string;
    name: string;
    image_url: string;
  };
  signature: string;
  exerciseAmount: number;
};
export type WorkoutExercise = z.infer<typeof AddExerciseSchema>;

type CurrentSets = {
  [key: string]: number;
};
