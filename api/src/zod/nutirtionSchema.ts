import{z} from '@hono/zod-openapi';
const nutritionSchema=z.object({
    user_id:z.number().openapi({
        example:1
    }),
    created_at:z.string().date(),
    calories:z.number().openapi({
        example:300

    }),
    protein:z.number().openapi({
        example:140.2

    }),
    carbs:z.number().openapi({
        example:150.3
    }),
    fat:z.number().openapi({
        example:120

    })
})

const removeNutritionSchema=z.object({
    id:z.number().openapi({
        example:11212
    }),
    user_id:z.number().openapi({
        example:1212

    })


})
export{nutritionSchema,removeNutritionSchema}