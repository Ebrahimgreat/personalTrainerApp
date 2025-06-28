import {z} from 'zod' 

const exerciseSchema=z.object({
    id:z.number(),
    name:z.string(),
    equipment:z.string(),
    type:z.string(),



})
const programmeDetailsSchema=z.object({
    id:z.number(),
    repRange:z.string(),
    sets:z.number(),
    exercise:exerciseSchema

})

export const programmeWorkoutSchema=z.object({
    id:z.number(),
    name:z.string(),
    programme_id:z.number(),
    programmeDetails:z.array(programmeDetailsSchema)
})

export const programmeSchema=z.object({
    id:z.number(),
    name:z.string(),
    description:z.string(),
    user_id:z.number(),
    programmeWorkout:z.array(programmeWorkoutSchema)

})

const userProgrammeSchema=z.object({
    id:z.number(),
    programme_id:z.number(),
    user_id:z.number(),
    status:z.string(),
    programme:programmeSchema
})



const updateClientProgrammeSchema=z.object({
    id:z.number()
})



export{userProgrammeSchema,updateClientProgrammeSchema}