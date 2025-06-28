import {z} from 'zod'
import { nullable } from 'zod/v4';
export const ExerciseSchema=z.object({
    id:z.number(),
    name:z.string(),
    equipment:z.string(),
    type:z.string(),


})
export const programmeDetailsSchema=z.object({
    id:z.number(),
    exercise_id:z.number(),
    repRange:z.string(),
    sets:z.number(),
  programme_workoutId:z.number(),
    exercise:ExerciseSchema

    
})
export const ProgrammeWorkoutSchema=z.object({
    id:z.number(),
    name:z.string(),
    programme_id:z.number(),
    programmeDetails:z.array(programmeDetailsSchema)
})
export type ProgrammeWorkout=z.infer<typeof ProgrammeWorkoutSchema>;