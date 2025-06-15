import { Hono } from "hono";
import { db } from "../../db";
import { getAuth } from "@hono/clerk-auth";
const measurementRoute=new Hono();


measurementRoute.get('/',async(c)=>{
  /*
  @route Get /api/measurements
  @desc Fetch all the fields of the measurements
  @returns {Measurements}
  */

  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json({Error:"Validation failed"});
  }


  const data=await db.query.measurementsTable.findMany();
  return c.json(data);
})
export default measurementRoute;