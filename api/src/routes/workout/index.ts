import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { db } from "../../db/db";
import { usersTable, workoutTable } from "../../db/schema";
import { eq } from "drizzle-orm";
const workoutRoutes= new Hono();


workoutRoutes.post('/store',async(c)=>{
    const auth=getAuth(c);
    const data=await c.req.json();
    if(!auth.userId)
    {
        return c.json({message:'User Does Not Exist'})
    }
    const userfind=await db.query.usersTable.findFirst({
        where:eq(usersTable.user_id,auth.userId)
    })
    if(!userfind){
        return c.json({message:'USer Does not exist'})
    }
    return c.json(data)

})
workoutRoutes.get('/history',async(c)=>{
    const auth=getAuth(c);
    if(!auth.userId){
        return c.json({message:'Authorization Failed'})
    }
    const userFind=await db.query.usersTable.findFirst({
        where:eq(usersTable.user_id,auth.userId)
    })
    if(!userFind){
        return c.json({message:'User Does not exist'})
    }
    const workout=await db.query.workoutTable.findMany({
        where:eq(workoutTable.user_id,2),
        with:{
            workoutDetail:{
                with:{
                    exercise:true
                }
            },
            programme:true

        },


    })
    return c.json(workout)

})
export default workoutRoutes;