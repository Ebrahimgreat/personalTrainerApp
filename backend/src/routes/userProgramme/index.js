import { Hono } from "hono";
import { db } from "../../db/db";
import { userProgrammeTable, usersTable } from "../../db/schema";
import { getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
const userProgrammeRoute = new Hono();
userProgrammeRoute.get('/', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json('not validated');
    }
    const user = await db.query.usersTable.findFirst({
        where: eq(usersTable.user_id, auth?.userId)
    });
    const response = await db.query.userProgrammeTable.findFirst({
        where: eq(userProgrammeTable.user_id, user?.id),
        with: {
            programme: {
                with: {
                    programmeWorkout: {
                        with: {
                            programmeDetails: {
                                with: {
                                    exercise: true
                                }
                            }
                        }
                    }
                }
            },
            user: true
        }
    });
    return c.json([response]);
});
export default userProgrammeRoute;
