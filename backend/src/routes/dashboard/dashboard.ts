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

  const data2=await db.query.usersTable.findFirst();

  const person=await db.query.usersTable.findMany({
    where:eq(usersTable.user_id,auth.userId),
    with:{
        children:true,
        workout:true,
        weight:true
    }
  })
 if(person.length==0){
    return c.json({message:"No Clients"})
 }
 return c.json(person)

 

})

export default dashboardRoutes;
