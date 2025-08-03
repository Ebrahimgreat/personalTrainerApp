import { getAuth } from "@hono/clerk-auth";
import { Hono } from "hono";
import { db } from "../../db/db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";

const trainerRoutes=new Hono();

trainerRoutes.get('/',async(c)=>{
    const auth=getAuth(c);
    if(!auth.userId){
        return c.json({message:'Authentication Failed'})
    }
    const userFind=await db.query.usersTable.findFirst({
        where:eq(usersTable.user_id,auth.userId)

    })
    if(!userFind){
        return c.json({message:'User Does not Exist'})
    }
  const trainer=await db.query.usersTable.findFirst({
    where:eq(usersTable.id,userFind.parent_id)
  })
  if(!trainer){
    return c.json([])
  }
  return c.json(trainer)

})
export default trainerRoutes