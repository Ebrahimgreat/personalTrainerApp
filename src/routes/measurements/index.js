import { Hono } from "hono";
import { db } from "../../db/db";
const measurementRoute = new Hono();
const MeasurementRoute = measurementRoute.get('/', async (c) => {
    /*
    @route Get /api/measurements
    @desc Fetch all the fields of the measurements
    @returns {Measurements}
    */
    const data = await db.query.measurementsTable.findMany();
    return c.json(data);
});
export default measurementRoute;
