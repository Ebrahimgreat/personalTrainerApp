import { Hono } from "hono";
import { db } from "../../db/db";
import { getAuth } from "@hono/clerk-auth";
import { measurementsDataTable, usersTable } from "../../db/schema";
import { and, eq } from "drizzle-orm";
import { measurementsData } from "../../../drizzle/schema";
import { userWeightSchema } from "../../zod/weightSchema";
import { deleteMeasurementSchema, insertMeasurementMultipleSchema, measurementSchema, updateMeasurementSchema } from "../../zod/measurementsSchema";

const measurementRoute=new Hono();



measurementRoute.post('/delete',async(c)=>{
  const auth=getAuth(c);
  if(!auth.userId){
    return c.json({message:'Unverfied'})
  }
  const userFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })
if(!userFind){
  return c.json({message:"Unable To find User"})
}
const data=await c.req.json();
const verfication=deleteMeasurementSchema.safeParse(data);
if(verfication.error){
  return c.json({message:'Invalid Format'})
}
const deletion=await db.delete(measurementsData).where(eq(measurementsDataTable.id,data.id)).returning();
return c.json(deletion)
})





measurementRoute.post('/update',async(c)=>{
  const auth=getAuth(c);
  if(!auth.userId){
    return c.json({message:'Unauthorized'})
  }
  const userFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })
  if(!userFind){
    return c.json({message:'USer Does not exist'})
  }
  const data=await c.req.json();
const verfication=updateMeasurementSchema.safeParse(data);
if(verfication.error){
  return c.json({message:'Error has been occured'})
}
const updateMeasurement=await db.update(measurementsDataTable).set({value:data.value,created_at:data.created_at}).where(eq(measurementsDataTable.id,data.id)).returning();
return c.json(updateMeasurement)
})





measurementRoute.post('/store',async(c)=>{
  const auth=getAuth(c);
if(!auth.userId){
  return c.json({message:'Unvefied'})
}
const userFind=await db.query.usersTable.findFirst({
  where:eq(usersTable.user_id,auth.userId)
})
if(!userFind){
  return c.json({message:'User Does Not exist'})
}
const data=await c.req.json();

for(let i=0; i<data.measurement.length; i++)
{
  const verfication=insertMeasurementMultipleSchema.safeParse(data);
  if(verfication.error)
  {
    return c.json({message:'Unverfied'})
  }
  if(data.measurement[i].value==0)
  {
    continue
  }
  const newData=await db.insert(measurementsDataTable).values({user_id:userFind.id,measurement_id:data.measurement[i].id,created_at:verfication.data.created_at,value:data.measurement[i].value})
  

}
return c.json({message:'Values Inserted'})



})
measurementRoute.post('/storeWeight',async(c)=>{
  const auth=getAuth(c);
  if(!auth.userId){
    return c.json({message:'Error'})
  }
  const userFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })
  if(!userFind){
    return c.json({message:'User Does Not exist'})
  }
  const data=await c.req.json();
  const verfication=userWeightSchema.safeParse(data);
  if(verfication.error){
    return c.json({message:'Error Validating'})

  }

  const measurement=await db.insert(measurementsData).values({measurementId:3,value:verfication.data.scaleWeight,userId:userFind.id,createdAt:verfication.data.created_at}).returning();
  return c.json(measurement)

})

const MeasurementRoute=measurementRoute.get('/',async(c)=>{
  /*
  @route Get /api/measurements
  @desc Fetch all the fields of the measurements
  @returns {Measurements}
  */

  

  const data=await db.query.measurementsTable.findMany();
  return c.json(data);
})

measurementRoute.get('/data',async(c)=>{
  const auth=getAuth(c);
  if(!auth.userId){
    return c.json({message:'User Does not exist'})
  }
  const userFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })
  if(!userFind){
    return c.json({message:"Error"})
  }

  const id=Number(c.req.query('id'))
  const measurementsData=await db.query.measurementsDataTable.findMany({
    where:and(eq(measurementsDataTable.user_id,userFind.id),
    eq(measurementsDataTable.measurement_id,id)
  )
  })
  return c.json(measurementsData)
})


export default measurementRoute;
export type MeasurementType=typeof MeasurementRoute;
