import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { db } from "../../db/db";
import { latestActivitiesTable, usersTable } from "../../db/schema";
import { eq, or } from "drizzle-orm";
const latestActivitiesRoutes = new Hono();
latestActivitiesRoutes.get('/', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json('Not exist');
    }
    const userFind = await db.query.usersTable.findFirst({
        where: eq(usersTable.user_id, auth.userId)
    });
    if (!userFind) {
        return c.json('not exist');
    }
    const latestActivities = await db.query.latestActivitiesTable.findMany({
        where: or(eq(latestActivitiesTable.sender_id, userFind.id), eq(latestActivitiesTable.reciever_id, userFind.id)),
        with: {
            sender: true,
            reciever: true
        }
    });
    return c.json(latestActivities);
});
export default latestActivitiesRoutes;
