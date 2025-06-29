import { z } from 'zod';

const ExerciseSchema = z.object({
  id: z.number(), 
  name: z.string(),
  equipment: z.string(),
  type: z.string(),
});

const workoutDetailSchema = z.object({
  id: z.number(),
  workout_id: z.number(),
  set: z.coerce.number().int(),
  reps: z.coerce.number().int(),
  weight:z.coerce.number().nonnegative(),
  exercise_id:z.number(),
  exercise: ExerciseSchema
});

const workoutHistorySchema = z.object({
  id: z.number(),
  user_id:z.number(),
  name: z.string(),
  programme_id: z.number().nullable(),
  created_at: z.date(),
  workoutDetail: z.array(workoutDetailSchema),
});

export type workoutHistory=z.infer<typeof workoutHistorySchema>;
export {workoutHistorySchema}