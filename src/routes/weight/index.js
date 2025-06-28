import { Hono } from "hono";
import { db } from "../../db/db.js";
import { eq, desc, sum, count } from "drizzle-orm";
import { latestActivitiesTable, usersTable, weightTable } from "../../db/schema.js";
import { weightSchema, removeWeightSchema } from "../../zod/weightSchema.js";
import { getAuth } from "@hono/clerk-auth";
const weightRoutes = new Hono();
weightRoutes.get('/', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json('Not found');
    }
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.user_id, auth.userId)
    });
    const page = Number(c.req.query('page'));
    const weight = await db.select().from(weightTable).orderBy(weightTable.id).limit(10).offset((page - 1) * 10).where(eq(weightTable.user_id, user.id));
    return c.json(weight);
});
weightRoutes.post('/remove', async (c) => {
    const body = await c.req.json();
    const result = (removeWeightSchema.safeParse(body));
    if (!result) {
        return c.json({ error: 'Validation error' });
    }
    const weight = await db.delete(weightTable).where(eq(weightTable.id, body.id));
    return c.json('Weight has been deleted Successfully');
});
weightRoutes.post('/store', async (c) => {
    const body = await c.req.json();
    const user = getAuth(c);
    if (!user?.userId) {
        return c.json('not found');
    }
    return c.json(user);
    const userFind = await db.query.usersTable.findFirst({
        where: eq(usersTable.user_id, user?.userId)
    });
    const result = (weightSchema.safeParse({
        user_id: userFind?.id,
        scaleWeight: body.scaleWeight,
        created_at: body.created_at
    }));
    if (!result.success) {
        return c.json({ error: 'Validation failed could not create a Weight', message: result.error.format() });
    }
    else {
        try {
            const currentDate = new Date(body.created_at);
            const weightFind = await db.select().from(weightTable).where(eq(weightTable.created_at, currentDate));
            if (!weightFind) {
                return c.json('no');
            }
            else {
                const weightCheck = await db.select({ value: sum(weightTable.scaleWeight), count: count() }).from(weightTable).where(eq(weightTable.user_id, userFind?.id)).orderBy(desc(weightTable.id)).limit(6);
                const numberValue = Number(weightCheck[0].value);
                const totalWeight = numberValue + body.scaleWeight;
                const avgWeight = totalWeight / (weightCheck[0].count + 1);
                const newWeight = await db.insert(weightTable).values({ created_at: currentDate, scaleWeight: body.scaleWeight, trendWeight: avgWeight, user_id: userFind?.id }).returning();
            }
        }
        catch (error) {
            console.log(error);
        }
        if (userFind?.parent_id != null) {
            const latestWeight = await db.insert(latestActivitiesTable).values({
                sender_id: userFind.id,
                reciever_id: userFind.parent_id,
                message: `A new weight ${body.scaleWeight} has been recorded `
            });
            return c.json(latestWeight);
        }
        const latestActivities = await db.insert(latestActivitiesTable).values({
            sender_id: userFind?.id
        });
        return c.json(latestActivities);
    }
});
export default weightRoutes;
