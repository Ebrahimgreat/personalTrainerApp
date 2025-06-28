import { Hono } from "hono";
import { db } from "../../db/db";
import { and, eq } from "drizzle-orm";
import { programmeDetails, programmeWorkout } from "../../../drizzle/schema";
import { ProgrammeWorkout, ProgrammeWorkoutSchema } from "../../zod/programmeWorkoutSchema";
import { programmeDetailsTable, programmeWorkoutTable } from "../../db/schema";
import { getAuth } from "@hono/clerk-auth";
import { templateAdditionExercise, templateDeletionSchema, templateExerciseDeletionSchema, templateRecordUpdate, TemplateSchema, updateTemplateMainSchema } from "../../zod/templateSchema";

const templateRoutes= new Hono();

templateRoutes.post('/updateRecord',async(c)=>{
    const auth=getAuth(c);
    if(!auth?.userId){
        return c.json({message:"Unverfied Autrh"})
    }
    const body=await c.req.json();
    const verfication=templateRecordUpdate.safeParse(body);
    if(verfication.error){
        return c.json({message:"Unverfied"});
    }
    const data = await db
    .update(programmeDetailsTable)
    .set({
      sets: body.sets,
      repRange: body.repRange, // assuming body.repRange is correct
      programme_workoutId: body.template_id
    })
    .where(
      and(
        eq(programmeDetailsTable.exercise_id, body.exercise_id),
        eq(programmeDetailsTable.programme_workoutId, body.template_id)
      )
    )
    .returning();   return c.json(data)

})


templateRoutes.post('/addExercise',async(c)=>{
    const auth=getAuth(c);
    if(!auth?.userId){
        return c.json({message:"Authentication Failed"});
    }
    const body=await c.req.json();
    const verfication=templateAdditionExercise.safeParse(body);
    if(verfication.error){
        return c.json({message:"Unverfied"});
    }
    const newRecord=await db.insert(programmeDetailsTable).values({exercise_id:body.exercise_id,programme_workoutId:body.template_id,repRange:body.repRange,sets:body.sets}).returning();
    return c.json(newRecord)
})

templateRoutes.post('/deleteExercise',async(c)=>{
    const auth=getAuth(c);
    if(!auth?.userId){
        return c.json({message:"Unverified"})
    }
    const body=await c.req.json();
    const verficiation=templateExerciseDeletionSchema.safeParse(body);
    if(verficiation.error){
        return c.json({message:"Unverfied"})
    }
    const deletion=await db.delete(programmeDetailsTable).where(eq(programmeDetailsTable.id,body.id)).returning();
    return c.json("Item Deleeted");

})

templateRoutes.post('/updateTemplateExercises',async(c)=>{
    const auth=getAuth(c);
    if(auth?.userId){
        return c.json({message:"Unverfied"})
    }
    const body=await c.req.json();
    return c.json(body)

    
})
templateRoutes.post('/updateMain',async(c)=>{
  const auth=getAuth(c);
  if(!auth?.userId){
    return c.json({message:"Unverified"});
  }
 const body=await c.req.json();
 const verification=updateTemplateMainSchema.safeParse(body);
 if(verification.error){
    return c.json("Error")
 }
 const updating=await db.update(programmeWorkout).set({name:body.name}).where(eq(programmeWorkout.id,body.id)).returning();
 return c.json(updating)


})




templateRoutes.post('/store',async(c)=>{
    const auth=getAuth(c);
    if(!auth?.userId){
        return c.json({message:"Error"})

    }
    const body=await c.req.json();

    const verifiedData=TemplateSchema.safeParse(body);
    if(verifiedData.error){
        return c.json({message:"Failed to verify"})
        console.log(verifiedData.error?.flatten())
    }
  const newData=await db.insert(programmeWorkoutTable).values({name:body.name,programme_id:body.programme_id}).returning()
  return c.json(newData)

})
const myTemplate=templateRoutes.get('/',async(c)=>{
 
    const id=c.req.query('id');

    const data:ProgrammeWorkout=await db.query.programmeWorkoutTable.findFirst({
        where:eq(programmeWorkout.id,id),
        with:{
            programmeDetails:{
                with:{
                    exercise:true
                }
            }
        }
    })




   

    return c.json(data)
    
});


templateRoutes.post('/delete',async(c)=>{
    const auth=getAuth(c);
    if(auth?.userId)
    {
        return c.json({message:"Unverfied"});
    }
    const body=await c.req.json();
    const verfication=templateDeletionSchema.safeParse(body);
    if(verfication.error)
    {
        return c.json({message:"Schema Verification Failed"})
    }
    const data=await db.delete(programmeWorkout).where(eq(programmeWorkout.id,body.id)).returning();
    return c.json(data)
  
    return c.json(body)
})

export type myTemplate= typeof myTemplate;
export default templateRoutes;