import{z} from '@hono/zod-openapi'

const weightSchema=z.object({
    user_id:z.number().openapi({
        example:1
        
    }),
    created_at:z.string().date(),
  
    scaleWeight:z.number().openapi({
        example:73.2
    })

}).openapi('Weight')

const removeWeightSchema=z.object({
    id:z.number().openapi({
        example:1232
    })

})

export {weightSchema,removeWeightSchema}