import { z } from "@hono/zod-openapi";
const clientUpdateSchema = z.object({
    name: z.string(),
    age: z.number(),
    notes: z.string()
});
const clientSchema = z.object({
    name: z.string().openapi({
        example: "Ebrahim",
    }),
    age: z.number().openapi({
        example: 13
    }),
    email: z.string().openapi({
        example: 'ebrahimgreat@gmail.com'
    })
});
const clientDeletionSchema = z.object({
    id: z.number()
});
export { clientSchema, clientDeletionSchema, clientUpdateSchema };
