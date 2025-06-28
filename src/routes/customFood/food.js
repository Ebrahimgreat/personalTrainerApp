import { Hono } from "hono";
import { db } from "../../db/db.js";
import { like } from "drizzle-orm";
import { customFoodTable } from "../../db/schema.js";
import { customFoodSchema } from "../../zod/customFoodSchema.js";
const customFoodRoute = new Hono();
customFoodRoute.get('/', async (c) => {
    const query = c.req.query('foodName');
    const data = await db.select().from(customFoodTable).where(like(customFoodTable.foodName, `${query}%`));
    return c.json(data);
});
customFoodRoute.post('/store', async (c) => {
    const body = await c.req.json();
    const result = customFoodSchema.safeParse(body);
    if (!result) {
        return c.json('No');
    }
    else {
        const value = await db.insert(customFoodTable).values({
            foodName: body.foodName,
            defaultCalories: body.defaultCalories,
            defaultCarbs: body.defaultCalories,
            defaultFat: body.defaultCalories,
            defaultProtein: body.defaultProtein,
            user_id: 1,
            defaultServing: body.defaultServing
        });
        return c.json(value);
    }
});
export default customFoodRoute;
