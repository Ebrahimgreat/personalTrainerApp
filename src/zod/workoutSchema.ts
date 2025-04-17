import {z} from 'zod';

const workoutSchema=z.object({
exercise_id:z.number().openapi({
    example:1212
}),
name:z.string().openapi({
    example:'squat',
}),
set:z.number().openapi({
    example:1212
}),
reps:z.number().openapi({
    example:12121
}),
weight:z.number().openapi({
    example:1212
}),
rir:z.number().openapi({
    example:1212
}),
workout_id:z.number().openapi({
    example:1
})



})



const workoutDeletionSchema=z.object({
    id:z.number().openapi({
       example:12
    }),
    user_id:z.number().openapi({
     example:1231
    })
    

})
export{workoutSchema,workoutDeletionSchema}