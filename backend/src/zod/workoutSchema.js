import { z } from 'zod';
const exercise = z.object({
    set: z.number(),
    reps: z.number(),
    weight: z.number()
});
const workoutExercise = z.object({
    id: z.number(),
    name: z.string(),
    exercise: z.array(exercise)
});
const workoutSchema = z.object({
    name: z.string(),
    date: z.string(),
    workout: z.array(workoutExercise)
});
const workoutDeletionSchema = z.object({
    id: z.number().openapi({
        example: 12
    }),
    user_id: z.number().openapi({
        example: 1231
    })
});
export { workoutSchema, workoutDeletionSchema };
