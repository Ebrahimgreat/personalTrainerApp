import { Hono } from "hono";
import { db, } from "../../db/db.js";

import { eq,sum,sql } from "drizzle-orm";
import { programmesTable, userProgrammeTable, usersTable } from "../../db/schema.js";
import { unionAll } from 'drizzle-orm/sqlite-core'
import { clerkMiddleware,getAuth } from "@hono/clerk-auth";

import { union } from "zod";
import { programme } from "../../../drizzle/schema.js";

const dashboardRoutes=new Hono();


dashboardRoutes.get('/client',async(c)=>{
  const auth=getAuth(c);
  if (!auth.userId){
    return c.json({message:'User Does not exist'})
  }
  const userFind=await db.query.usersTable.findFirst({
    where:eq(usersTable.user_id,auth.userId),
    with:{
      parent:true,
      userProgramme:{
      where:eq(userProgrammeTable.status,'active'),
      with:{
        programme:true
       
      }
     }
    }
  })
  if(!userFind){
    return c.json({message:'User Does Not exist'})
  }
  return c.json(userFind)
})

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

 return c.json(person)

 

})

export default dashboardRoutes;
