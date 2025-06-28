import { Hono } from "hono";
import { db } from "../../db/db";
import { messagesTable, usersTable } from "../../db/schema";
import { eq, or } from "drizzle-orm";
import { getAuth } from "@hono/clerk-auth";
const messageRoute = new Hono();
messageRoute.get('/', async (c) => {
    const query = Number(c.req.query('id'));
    if (query == -1) {
        return c.json('');
    }
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json('not exist');
    }
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.user_id, auth?.userId),
    });
    const data = await db.query.messagesTable.findMany({
        where: or(eq(messagesTable.user_id, user?.id), eq(messagesTable.user_id, query)),
    });
    if (!data) {
        return c.json('not exist');
    }
    return c.json(data);
});
export default messageRoute;
