import{z} from '@hono/zod-openapi';
const exerciseSchema=z.object({
    name:z.string().openapi({
        example:"Bench Press"
    }),
    description:z.string().openapi({
        example:'Legs'

    })

})
export{exerciseSchema};