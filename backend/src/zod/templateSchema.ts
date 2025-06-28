import{z} from '@hono/zod-openapi';
const TemplateSchema=z.object({
   programme_id:z.number(),
    name:z.string()
})
const templateDeletionSchema=z.object({
    id:z.number()
})

const updateTemplateMainSchema=z.object({
    name:z.string(),
    id:z.number()

    
})
const templateExerciseDeletionSchema=z.object({
    id:z.number()
})
const templateAdditionExercise=z.object({
    template_id:z.number(),
    exercise_id:z.number(),
    sets:z.number(),
   repRange:z.string()

})
const templateRecordUpdate=z.object({
    exercise_id:z.number(),
    repRange:z.string(),
    sets:z.number(),
    template_id:z.number()

})


export {TemplateSchema,templateDeletionSchema,updateTemplateMainSchema,templateExerciseDeletionSchema,templateAdditionExercise,templateRecordUpdate}