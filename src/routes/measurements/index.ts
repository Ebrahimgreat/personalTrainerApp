import { Hono } from "hono";
import { db } from "../../db";
const measurementRoute=new Hono();

measurementRoute.get('/',async(c)=>{
  const data=await db.query.measurementsTable.findMany();
  return c.json(data);
})
export default measurementRoute;