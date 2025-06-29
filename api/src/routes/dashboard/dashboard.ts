import { Hono } from "hono";
import { db, } from "../../db/db.js";

import { eq,sum,sql } from "drizzle-orm";
import { usersTable } from "../../db/schema.js";
import { unionAll } from 'drizzle-orm/sqlite-core'
import { clerkMiddleware,getAuth } from "@hono/clerk-auth";

import { union } from "zod";

const dashboardRoutes=new Hono();


dashboardRoutes.get('/',async(c)=>{

    const auth=getAuth(c);
   
  if(!auth?.userId){
    return c.json({error:'Unauthorized'});
  }
 
  const userToFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId)
  })



if(!userToFind){
  return c.json({message:'User cannot be found'})
}
  const person=await db.query.usersTable.findMany({
    where:eq(usersTable.id,userToFind.id),
    with:{
        children:true,
        workout:true,
    
    }
  })
 if(person.length==0){
    return c.json({message:"No Clients"})
 }
 return c.json(person)

 

})

export default dashboardRoutes;
