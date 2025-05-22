import {z} from '@hono/zod-openapi';
const idSchema=z.object({
    id:z.number().positive(),

})
export{idSchema}