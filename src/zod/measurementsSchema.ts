import{z} from '@hono/zod-openapi';
const measurementSchema=z.object({
    created_at:z.string(),
    measurement_id:z.number(),
    value:z.number()
})
export{measurementSchema}