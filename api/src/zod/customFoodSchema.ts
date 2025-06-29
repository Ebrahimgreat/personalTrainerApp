import { z } from "@hono/zod-openapi";
import { object } from "zod";

const customFoodSchema=object({
    user_id:z.number().openapi({
        example:122323
    }),
    food_name:z.string().openapi({
        example:'hello'

    }),
    
    defaultCalories:z.number().openapi({
        example:24.242

    }),
    defaultCarbs:z.number().openapi({
        example:24.242

    }),
    defaultFat:z.number().openapi({
        example:24.242

    }),
    defaultProtein:z.number().openapi({
        example:24.242

    })
    

})
export {customFoodSchema};