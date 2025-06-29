import { Hono } from "hono";
import { db } from "../../db/db";
import { and, eq, isNotNull, like } from "drizzle-orm";
import { getAuth } from "@hono/clerk-auth";
import { workoutTable, workoutDetailsTable, usersTable, userProgrammeTable, exerciseTable, measurementsTable, measurementsDataTable } from "../../db/schema";
import { createClerkClient } from "@clerk/backend";
import { idSchema } from "../../zod/idSchema";
import { weightSchema } from "../../zod/weightSchema";
import { deleteMeasurementSchema, insertMeasurementMultipleSchema, insertWeightSchema, updateMeasurementSchema } from "../../zod/measurementsSchema";
import { clientDeletionSchema, clientUpdateSchema } from "../../zod/clientSchema";
import { workoutSchema } from "../../zod/workoutSchema";
import { workoutHistorySchema } from "../../zod/workoutHistorySchema";
import { updateClientProgrammeSchema, userProgrammeSchema } from "../../zod/clientProgrammeschema";
const clientRoutes = new Hono();
function addDays(startDate, days) {
    const dateArray = [];
    for (let i = 0; i < days; i++) {
        const dateString = new Date(startDate.getTime() + (i * 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        dateArray.push(dateString);
        console.log(dateString);
    }
    return dateArray;
}
clientRoutes.post('/delete', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({ message: "Unverfied" });
    }
    const body = await c.req.json();
    const verfication = clientDeletionSchema.safeParse(body);
    if (verfication.error) {
        return c.json({ message: "Error" });
    }
    const data = await db.delete(usersTable).where(eq(usersTable.id, body.id));
    return c.json("Data deleted");
});
const mainClientRoute = clientRoutes.get('/', async (c) => {
    /*
    @route Get/Clients
    Fetch all Clients for a user with a
    @desc Fetch all Clients for the logged-in trainer
    @param{string}[name]- Optional query Param to filter Clients by name
    @returns{Array<Object>} List of Client Users
    */
    const auth = getAuth(c);
    console.log(auth);
    if (!auth?.userId) {
        return c.json('failed');
    }
    const searchString = c.req.query('name') ?? '';
    const searchValue = searchString ?? '';
    const data = await db.query.usersTable.findMany({
        where: and(isNotNull(usersTable.parent_id), like(usersTable.name, `%${searchValue}%`)),
        columns: {
            user_id: false,
            parent_id: false
        },
        with: {
            userProgramme: {
                columns: {
                    user_id: false
                },
                with: {
                    programme: {
                        columns: {
                            user_id: false,
                            assigned_to: false
                        }
                    }
                }
            }
        }
    });
    if (!data) {
        return c.json('not found');
    }
    return c.json(data);
});
clientRoutes.get('/:id/programmes', async (c) => {
    /*
    @route get/clients/programmes
    @desc fetch the active programme of a client that is created by the logged in trainer
    @param{string} id
    @returns{Programme}} Active Programme with their details and exercise
    */
    const auth = getAuth(c);
    if (auth?.userId) {
        return c.json({ Error: "Unable to verify user" });
    }
    const id = Number(c.req.param('id'));
    const userProgramme = await db.query.userProgrammeTable.findFirst({
        where: and(eq(userProgrammeTable.user_id, id), eq(userProgrammeTable.status, 'active')),
        with: {
            programme: {
                columns: {
                    assigned_to: false,
                },
                with: {
                    programmeWorkout: {
                        with: {
                            programmeDetails: {
                                columns: {
                                    programme_workoutId: false,
                                },
                                with: {
                                    exercise: {
                                        columns: {
                                            instructions: false,
                                            photo: false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    if (!userProgramme) {
        return c.json({});
    }
    const verfication = userProgrammeSchema.safeParse(userProgramme);
    if (verfication.error) {
        return c.json({ message: verfication.error.format() });
    }
    return c.json(userProgramme);
});
clientRoutes.get('/hello', async (c) => {
    return c.json({ message: "Hi" });
});
clientRoutes.post('/:id/updateProgramme', async (c) => {
    const id = Number(c.req.param('id'));
    const auth = getAuth(c);
    if (auth?.userId) {
        return c.json({ messsage: "Verification Failed" });
    }
    const data = await c.req.json();
    const verfication = updateClientProgrammeSchema.safeParse(data);
    if (verfication.error) {
        return c.json({ messsage: "Error" });
    }
    const programmeFind = await db.query.userProgrammeTable.findFirst({
        where: and(eq(userProgrammeTable.status, 'active'), eq(userProgrammeTable.user_id, id))
    });
    if (programmeFind) {
        const dataUpdata = await db.update(userProgrammeTable).set({ status: 'not active' }).where(eq(userProgrammeTable.programme_id, programmeFind.id));
    }
    const newData = await db.insert(userProgrammeTable).values({ programme_id: data.id, user_id: id, status: 'active' }).returning();
    return c.json(newData);
});
//Measurements
clientRoutes.get('/:id/measurements', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({ Error: "Unable to verify User" });
    }
    const id = Number(c.req.param('id'));
    const result = idSchema.safeParse({ id });
    const query = Number(c.req.query('id'));
    const searchId = query ?? 0;
    if (!result.success) {
        return c.json({ error: 'validation Failed' });
    }
    const data = await db.select().from(measurementsDataTable).innerJoin(measurementsTable, eq(measurementsDataTable.measurement_id, measurementsTable.id)).where(and(eq(measurementsDataTable.user_id, id), eq(measurementsTable.id, searchId)));
    const measurements = data.map((item) => ({
        id: item.measurementsData.id,
        name: item.measurements.name,
        created_at: item.measurementsData.created_at,
        value: item.measurementsData.value,
    }));
    return c.json(measurements);
});
clientRoutes.post('/:id/measurement/delete', async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({ message: "Unverfied" });
    }
    const response = await c.req.json();
    const verification = deleteMeasurementSchema.safeParse(response);
    if (verification.error) {
        return c.json({ message: verification.error.flatten() });
    }
    const data = await db.delete(measurementsDataTable).where(eq(measurementsDataTable.id, verification.data.id)).returning();
    return c.json(data);
});
clientRoutes.post('/:id/measurement/storeMultiple', async (c) => {
    const id = Number(c.req.param('id'));
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({ message: "Unverified" });
    }
    const data = await c.req.json();
    const verfication = insertMeasurementMultipleSchema.safeParse(data);
    if (verfication.error) {
        return c.json({ message: verfication.error.message });
    }
    for (let i = 0; i < verfication.data.measurement.length; i++) {
        if (verfication.data.measurement[i].value != 0) {
            const data = await db.insert(measurementsDataTable).values({ measurement_id: verfication.data.measurement[i].id, user_id: id, created_at: verfication.data.created_at });
        }
    }
    return c.json(data);
});
clientRoutes.post('/:id/measurementUpdate', async (c) => {
    const id = Number(c.req.param('id'));
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json("Unverfied");
    }
    const data = await c.req.json();
    const verification = updateMeasurementSchema.safeParse(data);
    if (verification.error) {
        return c.json("ERROR BODD");
    }
    const dataToUpdate = await db.update(measurementsDataTable).set({ created_at: data.created_at, value: data.value, user_id: id }).where(eq(measurementsDataTable.id, data.id)).returning();
    return c.json(dataToUpdate);
});
const clientWorkoutHistory = clientRoutes.get('/:id/workoutHistory', async (c) => {
    const auth = getAuth(c);
    if (auth?.userId) {
        return c.json({ Error: "Unable to verify User" });
    }
    const id = Number(c.req.param('id'));
    const dateQuery = c.req.query('date');
    const date = dateQuery ?? "";
    const result = idSchema.safeParse({ id });
    if (!result.success) {
        return c.json({ error: 'Validation Failed' });
    }
    const workout = await db.query.workoutTable.findMany({
        where: eq(workoutTable.user_id, id),
        with: {
            programme: true,
            workoutDetail: {
                with: {
                    exercise: {
                        columns: {
                            photo: false,
                            instructions: false
                        }
                    }
                }
            }
        }
    });
    for (let i = 0; i < workout.length; i++) {
        const verfication = workoutHistorySchema.safeParse(workout[i]);
        if (verfication.error) {
            return c.json({ message: verfication.error.flatten() });
        }
    }
    return c.json(workout);
});
clientRoutes.get('/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const data = await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    });
    return c.json(data);
});
clientRoutes.post('/:id/weights/store', async (c) => {
    const id = Number(c.req.param('id'));
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({ message: "Unverified" });
    }
    const data = await c.req.json();
    const verfication = insertWeightSchema.safeParse(data);
    if (verfication.error) {
        return c.json({ message: verfication.error.flatten() });
    }
    const newRecord = await db.insert(measurementsDataTable).values({ value: verfication.data.scaleWeight, created_at: verfication.data.created_at, user_id: id, measurement_id: 4 }).returning();
    return c.json(newRecord);
});
clientRoutes.post('/:id/weights/store', async (c) => {
    const id = Number(c.req.param('id'));
    const verification = idSchema.safeParse({ id });
    if (!verification.success) {
        return c.json('Schema Valiation has been failed');
    }
    const body = {
        scaleWeight: 50,
        created_at: new Date(),
        user_id: id
    };
    const verificationOfWeight = weightSchema.safeParse(body);
    if (!verification.success) {
        return c.json("Validation has been failed");
    }
    const newWeight = await db.insert(measurementsDataTable).values({
        measurement_id: 3,
        value: 50,
        user_id: id
    });
    console.log("Weight inserted");
    return c.json("Weight Has been stored");
});
clientRoutes.get('/:id/stats', async (c) => {
    const exercise_id = Number(c.req.query('exercise_id'));
    if (!exercise_id) {
        return c.json({ message: "Exercise Id Is Required" });
    }
    if (isNaN(exercise_id)) {
        return c.json({ message: "Exercise_id must be a" });
    }
    const query = Number(c.req.param('id'));
    const data = await db.select().from(workoutDetailsTable).innerJoin(exerciseTable, eq(workoutDetailsTable.exercise_id, exerciseTable.id)).innerJoin(workoutTable, eq(workoutDetailsTable.workout_id, workoutTable.id)).where(and(eq(workoutTable.user_id, query), eq(exerciseTable.id, exercise_id)));
    const statsWorkout = data.map((item) => ({
        created_at: item.workout.created_at || '',
        exercise: {
            id: item.exercise.id || 0,
            name: item.exercise.name || '',
            weight: item.workoutDetails.weight || 0,
            reps: item.workoutDetails.reps || 0,
            set: item.workoutDetails.set || 0,
            rir: item.workoutDetails.rir || 0
        }
    }));
    return c.json(statsWorkout);
});
clientRoutes.post('/:id/updateInformation', async (c) => {
    const id = Number(c.req.param('id'));
    const auth = getAuth(c);
    if (!auth?.userId) {
        return c.json({ message: "Verification of User Failed" });
    }
    const data = await c.req.json();
    const verifcationOfData = clientUpdateSchema.safeParse(data);
    if (verifcationOfData.error) {
        return c.json({ message: "Verfication Failed" });
    }
    const updateInformation = await db.update(usersTable).set({ name: data.name, age: data.age, notes: data.notes }).where(eq(usersTable.id, id));
    return c.json(updateInformation);
});
clientRoutes.post('/store', async (c) => {
    const data = await c.req.json();
    return c.json("HELLO");
    try {
        const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
        const user = await clerkClient.users.createUser({
            emailAddress: [data.emailAddress],
            password: data.password
        });
        console.log(user);
        return c.json(user);
    }
    catch (error) {
        console.log(error);
    }
});
clientRoutes.post('/:id/workout/store', async (c) => {
    const auth = getAuth(c);
    const id = Number(c.req.param('id'));
    if (!auth?.userId) {
        return c.json("Error");
    }
    const verification = idSchema.safeParse({ id });
    if (!verification.success) {
        return c.json("Error has been occured");
    }
    const body = await c.req.json();
    const workoutVerification = workoutSchema.safeParse(body.workout);
    if (workoutVerification.error) {
        return c.json({ message: "Failed To verify" });
    }
    const insertRecord = await db.insert(workoutTable).values({ name: body.workout.name, created_at: body.workout.date, user_id: id }).returning();
    for (let i = 0; i < body.workout.workout.length; i++) {
        const newRecord = await db.insert(workoutDetailsTable).values({ workout_id: insertRecord[0].id, set: body.workout.workout[i].exercise.set, reps: body.workout.workout[i].reps, weight: body.workout.workout[i].weight, exercise_id: body.workout.workout[i].id });
    }
    return c.json({ message: "Workout Added" });
});
export default clientRoutes;
