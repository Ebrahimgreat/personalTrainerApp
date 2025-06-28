import {z} from 'zod';
const customExerciseSchema=z.object({
    name:z.string(),
    type:z.string(),
    equipment:z.string(),
    instructions:z.string()
    
})
export{customExerciseSchema}