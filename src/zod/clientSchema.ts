import{z} from "@hono/zod-openapi";
import { object } from "zod";
const clientSchema=z.object({
    name:z.string().openapi({
        example:"Ebrahim",
    }),
    age:z.number().openapi({
        example:13
    }),
    email:z.string().openapi({
        example:'ebrahimgreat@gmail.com'

    })

   

})
export  {clientSchema};